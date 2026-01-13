
# GigFlow 

## 1.Backend

A full-stack freelance marketplace backend with real-time notifications and transactional integrity.

## Features

✅ JWT Authentication with HttpOnly Cookies\
✅ Role-fluid system (Any user can be Client or Freelancer)\
✅ CRUD operations for Gigs\
✅ Bidding system with hire logic\
✅ MongoDB Transactions to prevent race conditions\
✅ Real-time notifications with Socket.io\
✅ Controller-Repository-Service pattern\
✅ Custom error handling\
✅ Input validation with Zod\

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- Zod Validation

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update `.env` with your values

5. Start the server
```bash
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Gigs
- `GET /api/gigs` - Get all open gigs (with search)
- `POST /api/gigs` - Create new gig
- `GET /api/gigs/:id` - Get gig by ID
- `GET /api/gigs/my-gigs` - Get user's posted gigs

### Bids
- `POST /api/bids` - Submit a bid
- `GET /api/bids/:gigId` - Get all bids for a gig (Owner only)
- `GET /api/bids/my-bids` - Get user's bids
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (with transaction)

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read

## Socket.io Events

### Client → Server
- Connect with `auth.token` in handshake

### Server → Client
- `notification` - Real-time notification event


## 2.GigFlow Frontend

Modern, responsive React frontend for the GigFlow freelance marketplace.

## Features

✅ Modern UI with Tailwind CSS\
✅ Responsive design (mobile, tablet, desktop)\
✅ Real-time notifications with Socket.io\
✅ Context API for state management\
✅ Toast notifications\
✅ Protected routes\
✅ Clean component architecture\

## Installation

1. Install dependencies
```bash
npm install
```

2. Create `.env` file
```bash
cp .env.example .env
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

- `/src/api` - API service layers
- `/src/components` - Reusable components
- `/src/context` - Context providers
- `/src/hooks` - Custom hooks
- `/src/pages` - Page components
- `/src/utils` - Utility functions

## Technologies

- React 18
- Vite
- Tailwind CSS
- React Router v6
- Socket.io Client
- Axios
- Lucide React (icons)
````
