import { Request, Response } from "express";
import createActivitiesService from "../../services/activities/createActivities.service";
import deleteActivitiesService from "../../services/activities/deleteActivities.service";
import getActivitiesService from "../../services/activities/getActivities.service";
import updateActivitiesService from "../../services/activities/updateActivities.service";

const createActivitiesController = async (req: Request, res: Response) => {
    const newActivitie = await createActivitiesService()
    return res.status(201).json(newActivitie)
}

const deleteActivitiesController = async ( req: Request, res: Response ) => {
    const { id } = req.params
    const deletedActivitie = await deleteActivitiesService(id)
    return res.status(200).json(deletedActivitie)
}

const getActivitiesController = async (req: Request, res: Response) => {
    
    const listActivities = await getActivitiesService()
    return res.status(200).json(listActivities)
}

const updateActivitiesController = async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedActivitie = await updateActivitiesService(id)
    return res.status(201).json(updatedActivitie)
}
