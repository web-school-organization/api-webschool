import { ISchoolRequest } from "../../interfaces/schools";
import { ISessionRequest } from "../../interfaces/sessions";

export const mockedSchool: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Gabriel Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

export const mockedSchoolInvalidId: ISchoolRequest = {
  name: "Escola Educacional Plinio",
  email: "plinio@email.com",
  password: "123456",
  type: "school",
  director: "Rogerio Plinio",
  address: {
    state: "SE",
    city: "Alagados",
    district: "Rua 1",
    number: "186",
    zipCode: "48754000",
  },
};

export const mockedSchoolLogin: ISessionRequest = {
  email: "salesiano@email.com",
  password: "123456",
};

export const mockedSchoolInvalidIdLogin: ISessionRequest = {
  email: "plinio@email.com",
  password: "123456",
};

export const mockedSchoolInvalidZipCode: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Gabriel Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "12345678910",
  },
};

export const mockedSchoolInvalidState: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Gabriel Salesiano",
  address: {
    state: "BAHIA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

export const mockedUpdatedSchool: ISchoolRequest = {
  name: "Kenzie Salesiano Academy",
  email: "salesiano@email.com",
  password: "123456",
  type: "school",
  director: "Luccas Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

export const mockedTeacherLogin: ISessionRequest = {
  email: "fabio@mail.com.br",
  password: "123456",
};

export const mockedStudentLogin: ISessionRequest = {
  email: "joana@mail.com",
  password: "123456",
};

export const mockedInvalidLogin: ISessionRequest = {
  email: "giuseppe_cadura@mail.com",
  password: "xaOlinMatADorDePorco056",
};
