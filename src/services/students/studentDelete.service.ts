import { AppDataSource } from "../../data-source";
import {Student} from '../../entities/students.entity'
import { AppError } from "../../errors/app.error";


const studentDeleteService = async (id:string) =>{

    const studentRepository = AppDataSource.getRepository(Student);
    const student = studentRepository.findOneBy({id});
    if(!student){
        throw new AppError('Invalid id',404);
    }
    studentRepository.delete(id);
    



}

export default studentDeleteService