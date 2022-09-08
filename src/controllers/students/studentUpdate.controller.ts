import { instanceToPlain } from 'class-transformer'
import {Request,Response} from 'express'
import studentUpdateService from '../../services/students/studentUpdate.service'

const studentUpdateController = async(req:Request,res:Response) =>{

    const {id} = req.params
    const {name,email,password,registration,shift,team,feedbacks} = req.body


    const updatedUser = await studentUpdateService({name,email,password,id,registration,shift,team,feedbacks})


    return res.status(200).json(instanceToPlain(updatedUser))

}

export default studentUpdateController