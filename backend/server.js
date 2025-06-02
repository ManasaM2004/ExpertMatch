import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Important: enables JSON body parsing

// ✅ MongoDB connection
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
  }
}

connectDB();

// ➕ Create Feedback
app.post('/api/feedback', async (req, res) => {
  console.log("🟢 Headers:", req.headers);
  console.log("🔵 Body:", req.body);
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Bad request: body is empty" });
    }

    const {
      professorId,
      professorName,
      labSubject,
      labDate,
      labTime,
      feedback
    } = req.body;

    const feedbackEntry = {
      professorId,
      professorName,
      labSubject,
      labDate,
      labTime,
      feedback,
      submittedAt: new Date().toISOString()
    };

    await feedbackCollection.insertOne(feedbackEntry);
    res.status(201).json({ message: '✅ Feedback stored successfully!' });
  } catch (e) {
    console.error('❌ Error saving feedback:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// 📄 Read All Feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await feedbackCollection.find({}).toArray();
    res.json(feedbacks);
  } catch (e) {
    console.error('❌ Error fetching feedback:', e);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// ✏️ Update Feedback
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.updatedAt = new Date().toISOString();

    const result = await feedbackCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json({ message: '✅ Feedback updated successfully!' });
  } catch (e) {
    console.error('❌ Error updating feedback:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🗑️ Delete Feedback
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await feedbackCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json({ message: '✅ Feedback deleted successfully!' });
  } catch (e) {
    console.error('❌ Error deleting feedback:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🚀 Start Server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
