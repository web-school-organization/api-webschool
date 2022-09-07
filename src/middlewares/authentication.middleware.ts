import { Request, Response, NextFunction } from "express"
import jwt, { decode } from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../errors/app.error"


const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        throw new AppError('Invalid token', 401)
    }

    const token = bearerToken.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decode: any) => {
        if(error){
            throw new AppError('Invalid token', 401)
        }

        req.user = {
            type: decode.type,
            id: decode.id
        }

        next()
    })

}

export default authenticationMiddleware