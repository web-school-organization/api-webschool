import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/students.entity";
import { IStudentRequest } from "../../interfaces/students/index";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/app.error";
import { Team } from "../../entities/teams.entiy";

const studentCreateService = async ({
  name,
  email,
  password,
  registration,
  shift,
  team,
}: IStudentRequest) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const teamRepository = AppDataSource.getRepository(Team);

  const emailExists = await studentRepository.findOneBy({ email });

  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }

  const teamAlreadyExistis = await teamRepository.findOneBy({ name: team });

  if (!teamAlreadyExistis) {
    throw new AppError("Team not found", 404);
  }

  const student = await studentRepository.save({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10),
    registration: registration,
    shift: shift,
    team: teamAlreadyExistis,
  });

  const createdStudent = await studentRepository.findOne({
    where: { id: student.id },
    relations: { team: true },
  });

  return createdStudent;
};

export default studentCreateService;
