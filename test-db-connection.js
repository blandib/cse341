require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  console.log('Testing MongoDB connection...');
  console.log('Connection string:', uri.replace(/:\/\/.*@/, '://<credentials>@'));
  
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log('Attempting to connect...');
    await client.connect();
    
    console.log('Connection successful!');
    const db = client.db();
    console.log('Database name:', db.databaseName);
    
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    await client.close();
  } catch (err) {
    console.error('\n!!! Connection failed !!!');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    
    if (err.name === 'MongoServerSelectionError') {
      console.error('\nPossible solutions:');
      console.error('1. Verify your IP is whitelisted in MongoDB Atlas');
      console.error('2. Check your username/password in the connection string');
      console.error('3. Ensure your cluster name is correct');
      console.error('4. Test network connectivity to MongoDB');
    }
  }
}

testConnection();
