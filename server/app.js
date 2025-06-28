<<<<<<< HEAD
=======
// backend/app.js
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => res.send('🎉 API is running...'));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college-event', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
=======
const userRoutes = require('./routes/userRoutes'); // 👈 Make sure this path is correct
const eventRoutes = require('./routes/eventRoutes');
const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/events', eventRoutes);


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/college-event', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Test Route
app.get('/', (req, res) => {
  res.send('🎉 API is running...');
});


>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
