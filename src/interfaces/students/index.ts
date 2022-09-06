export interface IStudentRequest {
    name: string
    email:string
    password:string
    type:string
    registration:string
    shift:string
    team: Array<any>
    feedbacks: Array<any>

}

export interface IStudent {
    id: string
    name:string
    email:string
    password:string
    type:string
    registration:string
    shift:string
    team: Array<any>
    feedbacks:Array<any>
    createdAt: Date
    updatedAt: Date
}
