import * as yup from "yup"
import { SchemaOf } from "yup";
import { IFeedbackAtualizatio, IFeedbackRequest } from "../interfaces/feedback"


export const schemaFeedback: SchemaOf<IFeedbackRequest> = yup.object().shape({
    name: yup.string().required(),
    feedback:yup.string().required(),
    email: yup.string().required(),
})

export const updateSchemaFeedback: SchemaOf<IFeedbackAtualizatio> = yup.object().shape({
    feedback:yup.string().required()
})