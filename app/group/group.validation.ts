import { body, checkExact } from 'express-validator'

export const createGroup = checkExact([
    body('name').notEmpty(),
    body('adminId').notEmpty(),
    body('isPrivate').notEmpty(),
])