import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import studentCreateService from "../../services/students/studentCreate.service";

const studentCreateController = async (req: Request, res: Response) => {
  const { name, email, password, registration, shift, team, feedbacks } = req.body;
  const studentCreated = await studentCreateService({
    name,
    email,
    password,
    registration,
    shift,
    team,
    feedbacks,
  });

  return res.status(201).send(instanceToPlain(studentCreated));
};

export default studentCreateController;
