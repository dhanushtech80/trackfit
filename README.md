# FIT TRACK - MERN Stack Fitness Tracker

FIT TRACK is a modern, fully functional fitness tracker application built with the MERN stack (MongoDB, Express, React, Node.js). 
It features a dark theme UI, responsive design, JWT authentication, and tracks daily activities like steps, calories, water intake, and workouts.

## Features

- **User Authentication**: Secure Registration and Login using JWT and bcrypt.
- **Daily Activity Tracking**: Tracks steps, calories burned, water intake, and active time per day.
- **Daily Reset**: Automatically starts a new activity record from zero for each new calendar day while preserving history.
- **Workout Logging**: Add various workouts (Running, Walking, Cycling, Gym, Yoga, etc.) with automatic calorie calculations.
- **Goals Management**: Set and track personalized daily goals.
- **Water Tracker**: Interactive water consumption tracker.
- **Activity History**: View past records with interactive Recharts (Line and Bar charts) and a detailed log table.
- **User Profile**: Update personal information and fitness goals.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios, Recharts, Framer Motion, Lucide React, React Toastify.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or a MongoDB URI

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   *Make sure MongoDB is running and the `MONGO_URI` is correct.*
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The application will be running at `http://localhost:5173` and the API at `http://localhost:5000`.

## Architecture & Daily Reset Logic
The application uses a specific combination of `userId` and `dateString` (YYYY-MM-DD) in the `Activity` model to ensure that a new record is created for each calendar day, effectively "resetting" the dashboard to zero without deleting any previous data.
