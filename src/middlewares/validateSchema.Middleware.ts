import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"

const validateSchemaMiddleware = (schema: AnySchema) => async(err: Error ,req: Request, res: Response, next: NextFunction) => {
    try {
        const info = req.body
        const validateSchema = await schema.validate(info)
        req.body = validateSchema
        next()
    } catch (error : any) {
        return res.status(400).json({
            error: error.errors?.join(', ')
        })
    }
} 

export { validateSchemaMiddleware }