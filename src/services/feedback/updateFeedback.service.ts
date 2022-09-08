import { AppDataSource } from "../../data-source";
import { Feedback } from "../../entities/feedbacks.entity";
import { AppError } from "../../errors/app.error"
import { IFeedbackAtualizatio, IFeedbackResponse, IUser } from "../../interfaces/feedback"


const updateFeedbackService = async({id, type}:IUser, {feedback}:IFeedbackAtualizatio):Promise<object | AppError> => {
    const feedbackRepository = AppDataSource.getRepository(Feedback)

    if (type === "student") {
      throw new AppError("You dont have permition");
    }

    const feedbackFind = await feedbackRepository.findOneBy({id:id})

    if (!feedbackFind) {
      throw new AppError("Feedback not found",404);
      
    }

    await feedbackRepository.update(id,{feedback:feedback});
    return {message:"User updated"}
}

export default updateFeedbackService