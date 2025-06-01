import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import feedbackRoutes from './routes/feedRoutes.js'; // 👈 must use .js in import

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

    // Inject the collection into the request object
    app.use((req, res, next) => {
      req.feedbackCollection = feedbackCollection;
      next();
    });

    // Mount the routes *after* Mongo is connected
    app.use('/api/feedback', feedbackRoutes);

    // Start server
    app.listen(PORT, () =>
      console.log(`🚀Server running at : http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
}

connectDB();