const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialMediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// API Routes
app.get('/api/posts', (req, res) => {
  // Replace with your logic for fetching posts
  res.json({ message: 'Fetch posts here' });
});

app.post('/api/posts', (req, res) => {
  // Replace with your logic for creating a post
  const newPost = req.body;
  res.status(201).json({ message: 'Post created', post: newPost });
});

// Serve React app for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
