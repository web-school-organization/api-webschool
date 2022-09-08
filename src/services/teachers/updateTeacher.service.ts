import { AppDataSource } from "../../data-source";
import { Teacher } from "../../entities/teachers.entity";
import { AppError } from "../../errors/app.error";
import { ITeachersRequest } from "../../interfaces/teachers";
import bcrypt from "bcryptjs"
import { Feedback } from "../../entities/feedbacks.entity";

const updateTeacherService = async (data: ITeachersRequest, id: string) => {
    const teacherRepository = AppDataSource.getRepository(Teacher)
    const feedbackRepository = AppDataSource.getRepository(Feedback)
    const updateTeacher = await teacherRepository.findOneBy({id})

    if(updateTeacher?.id === undefined){
        throw new AppError('Cannot find teacher with this ID', 404)
    }

    const {name, email, password, type, shift, matter} = data

    if(password){
        const comparePassaword = bcrypt.compare(password, updateTeacher.password)
        if(!comparePassaword){
            const newPassword = await bcrypt.hash(password, 10)
            updateTeacher.password = newPassword
        }
    }

    updateTeacher.name = name || updateTeacher.name
    updateTeacher.email = email || updateTeacher.email
    updateTeacher.type = type || updateTeacher.type
    updateTeacher.shift = shift || updateTeacher.shift
    updateTeacher.matter = matter || updateTeacher.matter
    //updateTeacher.updatedAt = new Date()

    await teacherRepository.update(id, updateTeacher)
    const relationFeedbacks = await teacherRepository.findOne({where: {id: updateTeacher.id}, relations: {feedbacks: true}})
    
    return relationFeedbacks
}

export default updateTeacherService