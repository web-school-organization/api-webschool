import AppDataSource from "../../data-source";
import { Feedback } from "../../entities/feedbacks.entity";

const getFeedbackService = async (): Promise<Feedback[]> => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);

  const comment = feedbackRepository.find();

  return comment;
};

export default getFeedbackService;
