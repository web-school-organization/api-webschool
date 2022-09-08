import { AppDataSource } from "../../data-source";
import { Student } from "../../entities/students.entity";
import { AppError } from "../../errors/app.error";

const studentListOneService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Student);
  const student = await studentRepository.findOne({
    where: { id },
    relations: {
      team: true,
    },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  return student;
};

export default studentListOneService;
