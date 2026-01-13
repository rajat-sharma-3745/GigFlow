import { Server } from 'socket.io';
import { verifyToken } from '../utils/jwt.js';
import cookieParser from 'cookie-parser';
import { socketAuth } from '../middlewares/auth.js';

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true
    }
  });

  io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, async (err) => {
        await socketAuth(err, socket, next);
    })
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    socket.join(socket.userId);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};