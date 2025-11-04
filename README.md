# BrainQuizzer - Quiz Application

A full-stack quiz application built with React, Node.js, MongoDB, and Clerk authentication, featuring a dynamic leaderboard system.

## Features

- 🔐 **User Authentication** - Secure authentication using Clerk
- 📝 **Dynamic Quizzes** - Multiple choice quizzes with various categories and difficulty levels
- 🏆 **Leaderboard** - Real-time leaderboard tracking user scores and rankings
- 📊 **User Stats** - Track quiz attempts, accuracy, and scores
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast & Efficient** - Built with React and Express.js

## Tech Stack

### Frontend
- React 19
- React Router v7
- Clerk React (Authentication)
- Tailwind CSS
- Lucide React (Icons)
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Clerk SDK (Authentication)
- CORS

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BrainQuizzer
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
MONGO_URI=mongodb://localhost:27017/brainquizzer
PORT=5000
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

### 4. Get Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your Publishable Key and Secret Key
4. Add them to both `.env` files

### 5. Seed the Database

Populate the database with sample quizzes:

```bash
cd backend
npm run seed
```

This will create 6 sample quizzes with different categories and difficulty levels.

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### User Routes (`/api/users`)
- `POST /sync` - Sync user from Clerk to MongoDB
- `GET /stats` - Get user statistics

### Quiz Routes (`/api/quizzes`)
- `GET /` - Get all quizzes (with filters)
- `GET /:id` - Get specific quiz
- `POST /:id/submit` - Submit quiz answers
- `POST /` - Create new quiz

### Leaderboard Routes (`/api/leaderboard`)
- `GET /` - Get leaderboard
- `GET /user/:clerkId` - Get user detailed stats

## Project Structure

```
BrainQuizzer/
├── backend/
│   ├── Models/
│   │   ├── QuizSchema.js
│   │   ├── SubmissionSchema.js
│   │   └── UserSchemas.js
│   ├── routes/
│   │   ├── quizRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── seedQuizzes.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Banner.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Quizzes.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   ├── LeaderBoard.jsx
│   │   │   ├── MyProfile.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Database Models

### User Schema
- `clerkId` - Unique Clerk user ID
- `name` - User's full name
- `email` - User's email
- `imageUrl` - Profile image URL
- `totalScore` - Cumulative score
- `quizzesAttempted` - Number of quizzes taken
- `totalCorrect` - Total correct answers
- `totalQuestions` - Total questions attempted
- `rank` - User's rank on leaderboard

### Quiz Schema
- `title` - Quiz title
- `category` - Quiz category (React, JS, Python, Web)
- `difficulty` - Easy, Medium, or Hard
- `questions` - Array of questions with options and correct answers
- `estimatedTime` - Time in minutes

### Submission Schema
- `userId` - Clerk user ID
- `quizId` - Reference to Quiz
- `answers` - Array of user's answers
- `score` - Percentage score
- `correctCount` - Number of correct answers
- `timeTaken` - Time taken in seconds

## Features in Detail

### Authentication
- Users must sign in using Clerk authentication
- User data is synced between Clerk and MongoDB
- Protected routes require authentication

### Quizzes
- Browse quizzes by category and difficulty
- Filter and search functionality
- Track quiz progress (not-started, in-progress, completed)
- Real-time question navigation
- Immediate feedback on submission

### Leaderboard
- Top 3 users displayed prominently
- Complete rankings with scores and accuracy
- Highlight current user's position
- Confetti animation for top performers

### User Profile
- View personal statistics
- Recent quiz history
- Achievement badges
- Accuracy tracking

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your MongoDB Atlas connection string is correct
- Check if the MONGO_URI in `.env` is properly set

### Clerk Authentication Issues
- Verify your Clerk API keys are correct
- Ensure both publishable and secret keys are set in respective `.env` files
- Check that your Clerk application is active

### CORS Issues
- Ensure FRONTEND_URL in backend `.env` matches your frontend URL
- Check that the API_URL in frontend `.env` is correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

## Author

Your Name

---

**Happy Quizzing! 🎓**
