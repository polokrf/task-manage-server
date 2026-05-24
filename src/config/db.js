import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';
import dns from 'dns';

// Fix DNS SRV issue for MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = process.env.URL_DB;

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    // Connect MongoDB
    await client.connect();
    db = client.db('taskManager');

    // Ping database
    // await client.db('admin').command({ ping: 1 });

    // console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    // process.exit(1);
    throw error
  }
}
const getDB = () => db;

export { connectDB, getDB };
