export interface ITeachersRequest {
    name: string
    email: string
    password: string
    type: string
    shift: string
    matter: string
}

export interface ITeacherResponse {
    name: string
    email: string
    id: string
    type: string
    shift: string
    matter: string
}