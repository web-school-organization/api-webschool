import { ITeachersRequest } from "../../interfaces/teachers";
import { ISessionRequest } from "../../interfaces/sessions";
import { ISchoolRequest } from "../../interfaces/schools";
import { IFeedbackUpdated, IFeedbackRequest } from "../../interfaces/feedback";
import { IStudentRequest } from "../../interfaces/students";
import { ITeamsRequest } from "../../interfaces/teams";

export const mockedTeacher: ITeachersRequest = {
  name: "Fábio Junior",
  email: "fabio@mail.com.br",
  password: "123456",
  shift: "Matutino",
  matter: "Back-End",
};

export const mockedTeacherUpdate: ITeachersRequest = {
  name: "Júnior Fábio",
  email: "fabio@mail.com.br",
  password: "123456",
  shift: "Matutino",
  matter: "Back-End",
};

export const mockedFeedback: IFeedbackRequest = {
  name: "fabio",
  feedback: "você não fez a atividade",
  email:"joana@mail.com"
};

export const mockedFeedbackBranco: IFeedbackRequest = {
  name: "",
  feedback: "",
  email:""
};

export const mockedFeedbackUpdated: IFeedbackUpdated ={
  feedback:"feed atualizado"
}

export const mockedSchool: ISchoolRequest = {
  name: "Centro Educacional Salesiano",
  email: "salesiano@email.com",
  password: "123456",
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
  email: "salesianoZipCode@email.com",
  password: "123456",
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
  email: "salesianoInvalidState@email.com",
  password: "123456",
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
  director: "Luccas Salesiano",
  address: {
    state: "SE",
    city: "Conceição do Coité",
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

export const mockedTeam: ITeamsRequest = {
  name: "307",
};

export const mockedInvalidTeam = {
  robson: "antunes",
};

export const mockedSchoolAddressExists = {
  name: "Centro Educacional Salesiano",
  email: "salesianoaddressexists@email.com",
  password: "123456",
  director: "Gabriel Salesiano",
  address: {
    state: "BA",
    city: "Serrinha",
    district: "Primeira Travessa Antonio Pinheiro da Mota",
    number: "166",
    zipCode: "48700000",
  },
};

export const mockedStudent: IStudentRequest = {
  name: "Joana",
  email: "joana@mail.com",
  shift: "matutino",
  registration: "4684168111184",
  team: "307",
  password: "123456",
};

export const mockedStudentAuth: IStudentRequest = {
  name: "Mario",
  email: "mario@mail.com",
  shift: "matutino",
  registration: "4684168111184",
  team: "307",
  password: "123456",
};
