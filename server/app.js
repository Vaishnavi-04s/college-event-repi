// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // 👈 Make sure this path is correct
const eventRoutes = require('./routes/eventRoutes');


const app = express();
const PORT = 5000;


require('dotenv').config();


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


