import { IResponsibleRequest } from "../../interfaces/responsibles";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/app.error";
import { Responsibles } from "../../entities/responsible.entity";
import bcrypt from "bcryptjs";

const responsibleCreateService = async ({name,email,password}:IResponsibleRequest) => {

     const responsiblesRepository = AppDataSource.getRepository(Responsibles); 
     const emailAlreadyExists = await responsiblesRepository.findOneBy({email});


    if(emailAlreadyExists){
        throw new AppError('Email already exists',400);
    } 
    password = bcrypt.hashSync(password,10)
     const responsible = await responsiblesRepository.save({name,email,password})
     
    

     const responsibleReturned = await responsiblesRepository.save(responsible);

    const createdResponsible = await responsiblesRepository.findOneBy({
        id:responsibleReturned.id
    })

    return createdResponsible; 


}

export default responsibleCreateService