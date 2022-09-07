import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address.entity";
import { School } from "../../entities/school.entity";
import { ISchoolRequest } from "../../interfaces/schools";

export const schoolCreateService = async ({
  name,
  email,
  password,
  type,
  director,
  address,
}: ISchoolRequest) => {
  const schoolRepository = AppDataSource.getRepository(School);
  const addressRepository = AppDataSource.getRepository(Address);

  const newAddress = await addressRepository.save({
    city: address.city,
    state: address.state,
    district: address.district,
    number: address.number,
    zipCode: address.zipCode,
  });

  const newSchool = await schoolRepository.save({
    name,
    email,
    password,
    type,
    director,
    address: newAddress,
  });

  const school = await schoolRepository.findOneBy({ id: newSchool.id });

  return school;
};
