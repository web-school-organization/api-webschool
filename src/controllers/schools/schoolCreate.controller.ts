import { Request, Response } from "express";
import { ISchoolRequest } from "../../interfaces/schools";
import { schoolCreateService } from "../../services/schools/schoolCreate.service";

export const schoolCreateController = async (req: Request, res: Response) => {
  const { name, email, password, director, address }: ISchoolRequest = req.body;

  const newSchool = await schoolCreateService({
    name,
    email,
    password,
    type: "school",
    director,
    address,
  });

  console.log("aqui");
  console.log(newSchool);

  // adicionar exclude depois
  const novaEscola = {
    id: newSchool.id,
    name: newSchool.name,
    email: newSchool.email,
    type: newSchool.type,
    director: newSchool.director,
    address: newSchool.address,
    teams: newSchool.teams,
  };

  return res.status(201).json(novaEscola);
};
