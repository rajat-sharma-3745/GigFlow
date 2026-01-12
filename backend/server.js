import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import gigRoutes from './routes/gig.routes.js';
import bidRoutes from './routes/bid.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import CustomError from './utils/CustomError.js';
import { createServer } from 'http';
import connectDB from './config/db.js';
import { initializeSocket } from './config/socket.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'GigFlow API is running '
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/notifications', notificationRoutes);

app.all('*', (req, res, next) => {
    next(new CustomError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorMiddleware);



connectDB();

const server = createServer(app);

initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
