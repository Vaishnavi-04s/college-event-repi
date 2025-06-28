import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';  // <--- Import user routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Fix for Mongoose warning
mongoose.set('strictQuery', true);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use user routes for all /api/users requests
app.use('/api/users', userRoutes);  // <--- Add this line

// Event API routes
app.use('/api/events', eventRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
