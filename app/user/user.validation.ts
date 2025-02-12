import { body, checkExact } from 'express-validator'

export const createUser = checkExact([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
])

export const login = checkExact([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
])

export const pendingRequests = checkExact([
    body('adminId').notEmpty(),
])

export const requestApproval = checkExact([
    body('groupId').notEmpty(),
    body('userId').notEmpty(),
    body('adminId').notEmpty(),
])

export const approveUser = checkExact([
    body('groupId').notEmpty(),
    body('userId').notEmpty(),
    body('adminId').notEmpty(),
])