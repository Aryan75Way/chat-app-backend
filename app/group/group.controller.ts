import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import { createResponse } from "../common/helper/response.helper"
import * as groupService from "./group.service"

export const createGroup = expressAsyncHandler(async (req: Request, res: Response) => {
    const result = await groupService.createGroup(req.body)
    res.send(createResponse(result, 'Group created successfully'))
})

export const getGroupById = expressAsyncHandler(async (req: Request, res: Response) => {
    const result = await groupService.getGroupById(req.params.id)
    res.send(createResponse(result, 'Group found'))
})

export const getGroupByName = expressAsyncHandler(async (req: Request, res: Response) => {
    const result = await groupService.getGroupByName(req.params.name)
    res.send(createResponse(result, 'Group found'))
})

export const getAllGroups = expressAsyncHandler(async (req: Request, res: Response) => {
    const result = await groupService.getAllGroups()
    res.send(createResponse(result))
})