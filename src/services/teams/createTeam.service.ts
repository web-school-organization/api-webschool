import AppDataSource from "../../data-source";
import { Team } from "../../entities/teams.entiy";
import { AppError } from "../../errors/app.error";

const createTeamService = async (name: string, type: string): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);

  if (type !== "school") {
    throw new AppError("User does not have permission", 403);
  }

  const teamAlreadyExists = await teamRepository.findOneBy({ name });

  if (!!teamAlreadyExists) {
    throw new AppError("Team already exists");
  }

  const newTeam = await teamRepository.save({ name });

  const team = await teamRepository.findOneBy({ id: newTeam.id });

  return team!;
};

export default createTeamService;
