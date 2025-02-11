import { body, checkExact } from 'express-validator'

export const createUser = checkExact([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
])

export const login = checkExact([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
])