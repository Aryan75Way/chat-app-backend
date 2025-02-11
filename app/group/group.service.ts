import { prisma } from '../common/services/database.service'
import { IGroup } from './group.dto'

export const createGroup = async (data: IGroup) => {
    const { name, adminId } = data
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