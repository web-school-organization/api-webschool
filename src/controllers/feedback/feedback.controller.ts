import { Request, Response } from "express";
import {
  IFeedbackAtualizatio,
  IFeedbackRequest,
} from "../../interfaces/feedback";
import createFeedbackService from "../../services/feedback/createFeedback.service";
import deleteFeedbackService from "../../services/feedback/deleteFeedback.service";
import getFeedbackService from "../../services/feedback/getFeedback.service";
import updateFeedbackService from "../../services/feedback/updateFeedback.service";

const createFeedbackController = async (req: Request, res: Response) => {
  const { type } = req.user;
  const id = req.user.id;
  const { feedback, name, email }: IFeedbackRequest = req.body;
  const newFeedback = await createFeedbackService(
    { feedback, name, email },
    { id, type }
  );
  return res.json(newFeedback).status(201);
};
const getFeedbackController = async (req: Request, res: Response) => {
  const getFeedback = await getFeedbackService();
  return res.json(getFeedback).status(200);
};
const updatefeedbackController = async (req: Request, res: Response) => {
  const { type } = req.user;
  const { id } = req.params;
  const { feedback }: IFeedbackAtualizatio = req.body;
  const newFeedback = await updateFeedbackService({ id, type }, { feedback });
  return res.json(newFeedback).status(200);
};
const deleteFeedbackController = async (req: Request, res: Response) => {
  const { type } = req.user;
  const { id } = req.params;
  await deleteFeedbackService({ id, type });
  return res.json().status(204);
};

export {
  updatefeedbackController,
  createFeedbackController,
  getFeedbackController,
  deleteFeedbackController,
};
