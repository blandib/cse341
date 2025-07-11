require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Database connection
const { initDb } = require('./backend/data/database');

// Routes
const contactsRouter = require('./backend/routes/contacts');
app.use('/contacts', contactsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API is running!');
});

// Start server after DB connection
initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  
  app.listen(port, () => {
    console.log(Server running at http://localhost:);
    console.log(Connected to MongoDB: );
  });
});
