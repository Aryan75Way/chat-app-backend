import { body, checkExact } from 'express-validator'

export const createGroup = checkExact([
    body('content').notEmpty(),
    body('senderId').notEmpty(),
    body('groupId').notEmpty(),
])