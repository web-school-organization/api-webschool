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

  const newAddress = new Address();
  newAddress.city = address.city;
  newAddress.state = address.state;
  newAddress.district = address.district;
  newAddress.number = address.number;
  newAddress.zipCode = address.zipCode;

  await addressRepository.save(newAddress);

  const newSchool = new School();
  newSchool.name = name;
  newSchool.email = email;
  newSchool.password = password;
  newSchool.type = type;
  newSchool.director = director;
  newSchool.address = newAddress;
  // Vai sair isso aqui
  newSchool.teams = [];

  await schoolRepository.save(newSchool);

  // Team não está criando automaticamente

  return newSchool;
};
