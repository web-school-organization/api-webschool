import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";

const listTeacherService = async (token: any) => {
  const decodeToken = token.split(" ")[1];

  jwt.verify(decodeToken, process.env.SECRET_KEY as string, (error: any, decode: any) => {
    if (error) {
      throw new AppError("Invalid Token", 401);
    }

    if (decode.type !== "school") {
      throw new AppError("Just school can access this route", 403);
    }
  });

  const teacherRepository = AppDataSource.getRepository(Teacher);
  const listTeachers = await teacherRepository.find();
  return listTeachers;
};

export default listTeacherService;
