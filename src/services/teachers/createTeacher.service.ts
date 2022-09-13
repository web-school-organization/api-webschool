import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { ITeachersRequest } from "../../interfaces/teachers";
import { AppError } from "../../errors/app.error";
import bcrypt from "bcryptjs";
import { School } from "../../entities/school.entity";
import { Team } from "../../entities/teams.entiy";

const createTeacherService = async (
  data: ITeachersRequest,
  typeLogin: string
): Promise<Teacher> => {
  if (typeLogin !== "school") {
    throw new AppError("Just school can access this route", 403);
  }

  const teacherRepository = AppDataSource.getRepository(Teacher);

  const { name, email, password, shift, matter, teams } = data;

  const teamsRepository = AppDataSource.getRepository(Team);

  const verifyTeam = await teamsRepository.findOneBy({name:teams[0]});
  if (!verifyTeam) {
    throw new AppError("Team not found",404);
  }
  
  const verifyEmail = await teacherRepository.findOneBy({ email });
  if (verifyEmail) {
    throw new AppError("This e-mail is alredy in use");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newTeacher = await teacherRepository.save({
    name,
    email,
    password: hashedPassword,
    shift,
    matter,
    team:verifyTeam
  });

  
  
  
  
  
  const retorno = await teacherRepository.findOne({
    where: { id: newTeacher.id },
    relations: { feedbacks: true },
  });
  
  await teamsRepository
  .createQueryBuilder()
  .update(Team)
  .set({teacher:[newTeacher], })
  .where("name = :name", { name: verifyTeam.name  })
  return retorno!;
};

export default createTeacherService;
