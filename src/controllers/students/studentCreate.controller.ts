import { Request,Response } from "express";
import handleErrorMiddleware from "../../middlewares/handleError.middleware";
import studentCreateService from '../../services/students/studentCreate.service'

const studentCreateController = async (req:Request,res:Response) =>{
    
    const{name,email,password,type,registration,shift,team,feedbacks} = req.body
    const studentCreated = await studentCreateService({name,email,password,type,registration,shift,team,feedbacks})

    return res.status(201).send(studentCreated)

}


export default studentCreateController