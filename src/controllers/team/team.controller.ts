import { Request, Response } from "express";
import createTeamService from "../../services/teams/createTeam.service";
import getOneTeamService from "../../services/teams/getOneTeam.service";
import listTeamsService from "../../services/teams/lisTeams.service";
import removeTeamService from "../../services/teams/removeTeam.service";
import updateTeamService from "../../services/teams/updateTeam.service";

const createTeamController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const type = req.user.type;
  const team = await createTeamService(name, type);

  return res.status(201).json(team);
};

const listTeamsController = async (req: Request, res: Response) => {
  const type = req.user.type;
  const teamList = await listTeamsService(type);

  return res.status(200).json(teamList);
};

const getOneTeamController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const type = req.user.type;
  const team = await getOneTeamService(type, id);

  return res.status(200).json(team);
};

const updateTeamController = async (req: Request, res: Response) => {
  const dataTeam = req.body;
  const { id } = req.params;
  const type = req.user.type;
  const team = await updateTeamService(dataTeam, type, id);

  return res.status(200).json(team);
};

const removeTeamController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const type = req.user.type;
  await removeTeamService(type, id);

  return res.status(204).send();
};

export {
  createTeamController,
  listTeamsController,
  getOneTeamController,
  updateTeamController,
  removeTeamController,
};
