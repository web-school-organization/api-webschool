import { AppDataSource } from "../../data-source"
import { Teacher } from "../../entities/teachers.entity"
import { AppError } from "../../errors/app.error"

const deleteTeacherService = async (id: string) => {
    const teacherRepository = AppDataSource.getRepository(Teacher)

    const deletedTeacher = await teacherRepository.findOneBy({id})
    if(!deletedTeacher){
        throw new AppError('Cannot find teacher with this ID', 404)
    }
    
    await teacherRepository.remove(deletedTeacher)
    
    return deletedTeacher
}

export default deleteTeacherService