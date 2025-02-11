import { Router } from 'express'
import { catchError } from '../common/middleware/catch-error.middleware'
import * as userController from './user.controller'
import * as userValidator from './user.validation'
import { authenticate } from '../common/middleware/authenticate.middleware'

const router = Router()

router
    .post(
        '/signup',
        userValidator.createUser,
        catchError,
        userController.createUser
    )
    .post('/login', userValidator.login, catchError, userController.login)
    .get('/:email', authenticate, userController.getUserByEmail)
    .get('/id/:id', authenticate, userController.getUserById)

export default router
