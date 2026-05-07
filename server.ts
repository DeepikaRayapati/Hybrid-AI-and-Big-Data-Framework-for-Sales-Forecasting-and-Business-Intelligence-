import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.warn("MONGO_URI not found in environment variables. Database features will be disabled.");
}

// Schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, always hash passwords!
  name: String,
  createdAt: { type: Date, default: Date.now }
});

const PredictionSchema = new mongoose.Schema({
  email: String, // Associated user
  context: {
    s: Number,
    i: Number,
    month: String
  },
  value: Number,
  date: { type: Date, default: Date.now },
  predictionId: String
});

const FeedbackSchema = new mongoose.Schema({
  email: String, // Associated user
  predictionId: String,
  actualSales: Number,
  notes: String,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
const Prediction = mongoose.model("Prediction", PredictionSchema);
const Feedback = mongoose.model("Feedback", FeedbackSchema);

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user: { email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ message: "Login successful", user: { email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/predictions", async (req, res) => {
  try {
    const prediction = new Prediction(req.body);
    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ error: "Failed to save prediction" });
  }
});

app.get("/api/predictions", async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email: String(email) } : {};
    const predictions = await Prediction.find(filter).sort({ date: -1 }).limit(50);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch predictions" });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

app.get("/api/feedback", async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email: String(email) } : {};
    const feedback = await Feedback.find(filter).sort({ timestamp: -1 }).limit(50);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

app.get("/api/feedback/count", async (req, res) => {
  try {
    const count = await Feedback.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch count" });
  }
});

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
