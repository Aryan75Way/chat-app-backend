import { prisma } from '../common/services/database.service'
import { requestApproval } from '../user/user.service'
import { IGroup } from './group.dto'

export const createGroup = async (data: IGroup) => {
    const { name, adminId, isPrivate } = data
    const result = await prisma.group.create({
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
    const result = await prisma.group.findUnique({
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
    const result = await prisma.group.findUnique({
        where: {
            name,
        },
    })
    return result
}

export const findUserInGroup = async (groupId: string, userId: string) => {
    const result = await prisma.group.findUnique({
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
    // if group is public, add user to group else ask group admin to aprrove user to group
    const result = await prisma.group.findUnique({
        where: {
            id: groupId,
        },
    })

    const admin = result?.adminId

    if (!result?.isPrivate) {
        const response = await prisma.group.update({
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
        return response
    } else {
        if (admin) {
            await requestApproval(groupId, userId, admin)
        }
        return false
    }
}

export const getAllGroups = async () => {
    const result = await prisma.group.findMany({})
    return result
}
