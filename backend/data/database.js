require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    
    // Use the same connection method that worked in the test
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB:', db.databaseName);
    return db;
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) throw Error('Database not initialized');
  return db;
};

module.exports = { connectDB, getDB };