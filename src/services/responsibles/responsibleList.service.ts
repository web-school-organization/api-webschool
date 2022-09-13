import AppDataSource from "../../data-source"
import { Responsibles } from "../../entities/responsible.entity"


export const responsibleListService = async () => {

    const responsibleRepository = AppDataSource.getRepository(Responsibles);
    const responsibles = await responsibleRepository.find();



    return responsibles


}


export default responsibleListService