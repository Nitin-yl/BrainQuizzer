# Quick Start Guide

Get BrainQuizzer up and running in 5 minutes!

## Step 1: Install Dependencies

```powershell
# Backend
cd backend
npm install

# Frontend
cd ..\frontend
npm install
```

## Step 2: Setup Environment Variables

### Backend (.env)
Create `backend\.env`:
```env
MONGO_URI=mongodb://localhost:27017/brainquizzer
PORT=5000
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

### Frontend (.env)
Create `frontend\.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Get Clerk Keys

1. Visit https://dashboard.clerk.com/
2. Sign up / Sign in
3. Create a new application
4. Copy your keys from API Keys section
5. Paste into both .env files

## Step 4: Start MongoDB

Make sure MongoDB is running on your machine:
```powershell
# If using MongoDB installed locally
mongod
```

Or use MongoDB Atlas (cloud database) - just update MONGO_URI in backend\.env

## Step 5: Seed Database

```powershell
cd backend
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Cleared existing quizzes
✅ Successfully inserted 6 quizzes
```

## Step 6: Start the Application

### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 7: Open the App

Visit http://localhost:5173 in your browser!

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check your MONGO_URI in backend/.env

### "Clerk keys invalid"
- Verify you copied the correct keys from Clerk dashboard
- Make sure there are no extra spaces in .env files
- Ensure frontend key starts with `pk_` and backend secret starts with `sk_`

### "Port already in use"
- Backend: Change PORT in backend/.env
- Frontend: Vite will automatically try another port

## Next Steps

1. Sign up using Clerk authentication
2. Browse available quizzes
3. Take a quiz and see your score
4. Check the leaderboard
5. View your profile stats

## API Testing

Test if backend is running:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "BrainQuizzer API is running"
}
```

---

**Need help?** Check the full README.md or open an issue!
