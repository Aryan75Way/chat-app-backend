import { Router } from 'express'
import { catchError } from '../common/middleware/catch-error.middleware'
import * as groupController from './group.controller'
import * as groupValidator from './group.validation'
import {authenticate} from '../common/middleware/authenticate.middleware'

const router = Router()

router
    .post(
        '/create',
        authenticate,
        groupValidator.createGroup,
        catchError,
        groupController.createGroup
    )
    .get(
        '/:id',
        authenticate,
        groupController.getGroupById,
    )
    .get('/group/:name/',
        authenticate,
        groupController.getGroupByName
    )
    .get('/', authenticate, groupController.getAllGroups)

export default router
