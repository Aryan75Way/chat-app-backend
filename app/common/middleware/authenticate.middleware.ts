import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as userService from '../../user/user.service'
import createHttpError from 'http-errors'
import expressAsyncHandler from 'express-async-handler'

export const authenticate = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            throw createHttpError(401, {
                message: `Invalid token`,
            })
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
        if (!decodedUser) {
            throw createHttpError(401, {
                message: `Invalid token`,
            })
        }
        const user = await userService.getUserById(decodedUser.id)
        if (!user) {
            throw createHttpError(401, {
                message: `Invalid token`,
            })
        }
        next()
    }
)
