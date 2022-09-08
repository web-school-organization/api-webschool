import { IStudentRequest } from "../../interfaces/students";

export const mockedStudent : IStudentRequest = {
    name: "Joana",
    email: "joana@mail.com",
    type:"student",
    shift:"",
    registration:"",
    team:[],
    feedbacks:[],
    password: "123456"
}


export const mockedSchool: any = {
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

export const mockedStudentAuth : IStudentRequest = {
    name: "Joana",
    email: "joana@mail.com",
    type:"student",
    shift:"",
    registration:"",
    team:[],
    feedbacks:[],
    password: "123456"
}



export const mockedSchoolLogin: any = {
    email: "salesiano@email.com",
    password: "123456",
  };