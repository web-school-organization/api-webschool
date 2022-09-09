import AppDataSource from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { ITeachersRequest } from "../../interfaces/teachers";
import { AppError } from "../../errors/app.error";
import bcrypt from "bcryptjs";

const createTeacherService = async (
  data: ITeachersRequest,
  typeLogin: string
): Promise<Teacher> => {
  if (typeLogin !== "school") {
    throw new AppError("Just school can access this route", 403);
  }
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const { name, email, password, shift, matter } = data;

  const verifyEmail = await teacherRepository.findOneBy({ email });
  if (verifyEmail) {
    throw new AppError("This e-mail is alredy in use", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newTeacher = await teacherRepository.save({
    name,
    email,
    password: hashedPassword,
    shift,
    matter,
  });

  const retorno = await teacherRepository.findOne({
    where: { id: newTeacher.id },
    relations: { feedbacks: true },
  });
  return retorno!;
};

export default createTeacherService;
