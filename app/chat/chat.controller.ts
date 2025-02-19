import { Server, Socket } from 'socket.io'
import * as groupService from '../group/group.service'
import * as userService from '../user/user.service'
import { decodeToken } from '../common/services/passport-jwt.service'

export function handleChat(socket: Socket, io: Server) {
    socket.broadcast.emit('message', `User connected: ${socket.id}`)
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `User disconnected: ${socket.id}`)
    })

    socket.on('message', (message: string) => {
        // Broadcast the message to all other connected clients
        socket.broadcast.emit('message', message)
    })

    socket.on('join-group', async (group: string) => {
        const groupExists = await groupService.getGroupByName(group)

        if (groupExists) {
            const token = socket.handshake.headers.authorization
            // @ts-ignore
            const user = decodeToken(token)

            // check if the user is already in the group
            if (user) {
                const userExistsInGroup = groupService.findUserInGroup(
                    group,
                    user.id
                )

                if (!userExistsInGroup) {
                    // check if the group is private
                    const groupExists = await groupService.getGroupByName(group)
                    if (groupExists?.isPrivate) {
                        await userService.requestApproval(group, user.id, groupExists.adminId)
                        socket.emit(
                            'message',
                            `User will be added to group after admin approval.`
                        )
                    } else {
                        const response = groupService.addUserToGroup(
                            group,
                            user.id
                        )

                        socket.join(group)
                        io.to(group).emit(
                            'message',
                            `User ${socket.id} joined group ${group}`
                        )
                    }
                }
            } else {
                socket.emit('message', `User not authorized to join group`)
            }
        } else {
            socket.emit('message', `No such group exists`)
        }
    })

    // broadcast message to all clients in the group
    socket.on('message-group', (data: { group: string; message: string }) => {
        console.log(`${data.group}: ${data.message}`)

        io.to(data.group).emit('message-group', data.message)
    })
}
