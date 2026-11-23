const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const DEFAULT_ROOM = 'general';

function setupSocket(httpServer) {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  // Har socket connection pe JWT verify hota hai
  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.replace('Bearer ', '');
    if (!token) return next(new Error('No token provided'));

    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (room = DEFAULT_ROOM) => {
      socket.join(room);
      console.log(`${socket.id} joined room ${room}`);
      io.to(room).emit('systemMessage', `${socket.user.username} joined ${room}`);
    });

    socket.on('chatMessage', ({ room = DEFAULT_ROOM, message }) => {
      if (!message) return;
      console.log(`[${room}] ${socket.user.username}: ${message}`);
      io.to(room).emit('chatMessage', {
        room,
        username: socket.user.username,
        message,
        time: new Date().toISOString(),
      });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = setupSocket;