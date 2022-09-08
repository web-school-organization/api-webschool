import { Team } from "../../entities/teams.entiy";
import { Feedback } from "../../entities/feedbacks.entity";
export interface IStudentRequest {
  name: string;
  email: string;
  password: string;
  type: string;
  registration: string;
  shift: string;
  team: string;
  feedbacks: Array<any>;
}

export interface IStudent{
  id:string,
  name: string;
  email: string;
  type: string;
  registration: string;
  shift: string;
  team: Team;
  feedbacks: Array<Feedback>;
  createdAt:Date
  updatedAt:Date


}