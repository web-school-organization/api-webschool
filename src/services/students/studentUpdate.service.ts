import { AppDataSource } from "../../data-source";
import {Student} from '../../entities/students.entity'
import { AppError } from "../../errors/app.error";
import { IStudentUpdated } from "../../interfaces/students";
import bcrypt from 'bcryptjs'

const studentUpdateService = async ({name,email,id,password,shift,team,registration,feedbacks}:IStudentUpdated) => {

    const studentRepository = AppDataSource.getRepository(Student);
    const student = studentRepository.findOneBy({id});
    const emailExists = await studentRepository.findOneBy({ email });

    if(!student){
        throw new AppError('Invalid id',404);
    }
    if (emailExists) {
        throw new AppError("Email already exists", 400);
      }

    const updatedUser = {
        id:id,
        name: name || student.name,
        email: email || student.email,
        password: bcrypt.hashSync(password,10) || student.password,
        shift: shift || student.shift,
        team: team || student.team,
        registration: registration || student.registration,
        feedbacks: feedbacks || student.feedbacks,
        createdAt: student.createdAt,
        updatedAt: new Date()
    }
    await studentRepository.update(id,updatedUser)

    return updatedUser

}

export default studentUpdateService