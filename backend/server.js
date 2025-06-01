import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const client = new MongoClient(process.env.MONGO_URI);
let feedbackCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('expertmatch');
    feedbackCollection = db.collection('feedbacks');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1); // Exit if DB fails to connect
  }
}

connectDB();

// Routes

// Submit feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const data = req.body;
    data.submittedAt = new Date().toISOString();
    await feedbackCollection.insertOne(data);
    res.status(201).json({ message: '✅ Feedback stored successfully!' });
  } catch (e) {
    console.error('❌ Error saving feedback:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await feedbackCollection.find({}).toArray();
    res.json(feedbacks);
  } catch (e) {
    console.error('❌ Error fetching feedback:', e);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);