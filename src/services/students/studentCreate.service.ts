import { AppDataSource } from "../../data-source";
import {Student} from '../../entities/students.entity'
import {IStudentRequest,IStudent} from '../../interfaces/students/index'
import bcrypt from 'bcryptjs'
import { AppError } from "../../errors/app.error";

const studentCreateService = async ({name,email,password,type,registration,shift,team,feedbacks}:IStudentRequest) => {

    const studentRepository = AppDataSource.getRepository(Student);

    const emailExists = await studentRepository.findOneBy({ email });

    if (emailExists) {
      throw new AppError("Email already exists", 400);
    }

    const student = new Student
    student.name = name
    student.email = email
    student.password = bcrypt.hashSync(password,10);
    student.type = type;
    student.registration = registration;
    student.shift = shift;
    student.team = team;
    student.feedbacks = feedbacks
    student.createdAt = new Date()
    student.updatedAt = new Date();

    studentRepository.create(student)
    await studentRepository.save(student)

    const studentReturned:IStudent = {
        id:student.id,
        name:student.name,
        email:student.email,
        type:student.type,
        registration:student.registration,
        shift:student.shift,
        team:student.team,
        feedbacks:student.feedbacks,
        createdAt:student.createdAt,
        updatedAt:student.updatedAt
    }
    

    return studentReturned

}

export default studentCreateService

