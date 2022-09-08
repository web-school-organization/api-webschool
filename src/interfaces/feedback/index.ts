
export interface IFeedbackAtualizatio{
    feedback:string
}


export interface IFeedbackRequest extends IFeedbackAtualizatio {
    name:string
    email:string

}

export interface IFeedbackResponse{
    id:string
}

export interface IUser{
    id:string
    type:string
}