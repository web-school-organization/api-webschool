import { AppDataSource } from "../../data-source";
import { School } from "../../entities/school.entity";

export const schoolListService = async () => {
  const schoolRepository = AppDataSource.getRepository(School);

  const schools = await schoolRepository.find();

  return schools;
};
