import { AppDataSource } from "../../data-source"
import { Student } from "../../entities/students.entity"
import { AppError } from "../../errors/app.error";


const studentListOneService = async (id:string) => {

    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOneBy({id})
    if(!student){
        throw new AppError('Invalid id',404);
    }

    return student


}

export default studentListOneService