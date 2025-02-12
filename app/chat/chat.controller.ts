import { Server, Socket } from 'socket.io';

export function handleChat(socket: Socket, io:Server) {
    socket.broadcast.emit('message',`User connected: ${socket.id}`);
    socket.on('disconnect', () => {
        socket.broadcast.emit('message',`User disconnected: ${socket.id}`);
    });

    socket.on('message', (message: string) => {
        // Broadcast the message to all other connected clients
        socket.broadcast.emit("hi");
    });
}
