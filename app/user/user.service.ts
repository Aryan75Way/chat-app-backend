import { prisma } from '../common/services/database.service'
import bcrypt from 'bcryptjs'
import { IUser } from './user.dto'

export const createUser = async (data: IUser) => {
    const saltRounds = 10;
    const password = data.password;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    data.password = hashedPassword;

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
