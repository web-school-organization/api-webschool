import { ITeachersRequest } from "../../interfaces/teachers";
import { ISessionRequest } from "../../interfaces/sessions";

export const mockedTeacher : ITeachersRequest = {
    name: "Fábio Júnio",
    email: "fabio@mail.com.br",
    password: "123456",
    type: "Teacher",
    shift: "Matutino",
    matter: "Back-End",
}


export const mockedTeacherUpdate : ITeachersRequest = {
    name: "Júnior Fábio",
    email: "fabio@mail.com.br",
    password: "123456",
    type: "Teacher",
    shift: "Matutino",
    matter: "Back-End",
}

export const mockedSchool = {
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
    teams: [],
  };


export const mockedSchoolLogin: ISessionRequest = {
  email: "salesiano@email.com",
  password: "123456",
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
