const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Used for password hashing

// Replace <db_password> with your actual MongoDB Atlas password
const url = 'mongodb+srv://iajayjajim:3qTJuQ9aDntd8wlV@cluster0.sgvob.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
const client = new MongoClient(url);

const app = express();
app.use(cors());
const port = 3000;
const dbName = 'cardiosense';

// Middleware to parse JSON data
app.use(bodyParser.json());

async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    const db = client.db(dbName);
    const collection = db.collection('Users');

    // Endpoint to register new users
    app.post('/register', async (req, res) => {
      const { name, email, password } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, password, and name are required' });
      }

      try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user object
        const newUser = {
          email,
          password: hashedPassword, // Store hashed password
          name,
          createdAt: new Date(),
          role: 'user',
          isActive: true
        };

        // Insert the new user into the collection
        const result = await collection.insertOne(newUser);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });

      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
      }
    });

    // Endpoint to verify user credentials
    app.post('/verification', async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      try {
        // Find the user in the Users collection
        const user = await collection.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.status(200).json({ message: 'Verification successful, redirecting...' });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }

      } catch (error) {
        console.error('Error during verification:', error);
        res.status(500).json({ error: 'An error occurred during verification' });
      }
    });

  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

// Call the main function to connect to MongoDB Atlas
main();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
