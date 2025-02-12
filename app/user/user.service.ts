import { prisma } from '../common/services/database.service'
import bcrypt from 'bcryptjs'
import { IUser } from './user.dto'

export const createUser = async (data: IUser) => {
    const saltRounds = 10
    const password = data.password
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    data.password = hashedPassword

    const result = prisma.user.create({
        data,
    })
    return result
}

export const getUserByEmail = async (email: string) => {
    const result = prisma.user.findFirst({
        where: {
            email,
        },
    })

    return result
}

export const getUserById = async (id: string) => {
    const result = prisma.user.findUnique({
        where: {
            id,
        },
    })
    return result
}

export const getPendingRequests = async (adminId: string) => {
    const result = prisma.user.findUnique({
        where: {
            id: adminId,
        },
        select: {
            pendingRequests: {
                select: {
                    groupId: true,
                    userId: true,
                },
            },
        },
    })
    return result
}

export const requestApproval = async (
    groupId: string,
    userId: string,
    adminId: string
) => {
    const result = await prisma.approval.create({
        data: {
            groupId,
            userId,
        },
    })
    await prisma.user.update({
        where: {
            id: adminId,
        },
        data: {
            pendingRequests: {
                connect: result,
            },
        },
    })
    return result
}

export const approveUser = async (
    groupId: string,
    userId: string,
    adminId: string
) => {
    const result = await prisma.group.findUnique({
        where: {
            id: groupId,
        },
        select: {
            adminId: true,
        },
    })
    if (result?.adminId === adminId) {
        await prisma.approval.deleteMany({
            where: {
                groupId,
                userId,
            },
        })
        const user = await prisma.group.update({
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
        return user
    }

    return false;
}
