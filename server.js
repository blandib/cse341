require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Database connection
const { connectDB, getDB } = require('./backend/data/database');

// Routes
const contactsRouter = require('./backend/routes/contacts');
app.use('/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.send('Contacts API is running!');
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();