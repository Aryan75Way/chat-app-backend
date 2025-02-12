import { prisma } from '../common/services/database.service'
import { IGroup } from './group.dto'

export const createGroup = async (data: IGroup) => {
    const { name, adminId, isPrivate } = data
    const result = prisma.group.create({
        data: {
            name,
            users: {
                connect: {
                    id: adminId,
                },
            },
            messages: {
                create: [],
            },
            adminId,
            isPrivate,
        },
    })
    return result
}

export const getGroupById = async (id: string) => {
    const result = prisma.group.findUnique({
        where: {
            id,
        },
        include: {
            creator: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    })
    return result
}

export const getGroupByName = async (name: string) => {    
    const result = prisma.group.findUnique({
        where: {
            name,
        },
    })
    return result
}

export const findUserInGroup = async (groupId: string, userId: string) => {
    const result = prisma.group.findUnique({
        where: {
            id: groupId,
        },
        include: {
            users: {
                where: {
                    id: userId,
                },
            },
        },
    })
    return result
}

export const addUserToGroup = async (groupId: string, userId: string) => {
    const result = prisma.group.update({
        where: {
            id: groupId,
        },
        data: {
            users: {
                connect: {
                    id: userId,
                },
            },
        },
    })
    return result
}