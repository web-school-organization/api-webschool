import { IFeedbackRequest } from "../../interfaces/feedback";
import { ISessionRequest } from "../../interfaces/sessions";


export const mockedFeedback:IFeedbackRequest = {
    name:"gabriel",
    feedback:"vc não fez a atividade"
}

export const mockedFeedbackBranco:IFeedbackRequest = {
    name:"",
    feedback:""
}


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
}