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
    .post('/pending-requests', userValidator.pendingRequests, authenticate, userController.getPendingRequests)
    .post('/approve-user', userValidator.approveUser, authenticate, userController.approveUser)
    .post('/request-approval', userValidator.requestApproval, authenticate, userController.requestApproval)
    .get('/me', authenticate, userController.getCurrentUser)

export default router
