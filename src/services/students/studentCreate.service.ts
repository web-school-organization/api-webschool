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

  const student = new Student();
  student.name = name;
  student.email = email;
  student.password = bcrypt.hashSync(password, 10);
  student.registration = registration;
  student.shift = shift;

  const studentReturned = await studentRepository.save(student);

  const createdStudent = await studentRepository.findOneBy({
    id: studentReturned.id,
  });

  return createdStudent;
};

export default studentCreateService;
