require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');       // For hashing passwords
const jwt = require('jsonwebtoken');      // For generating login tokens
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_for_dev_only';

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth_demo')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));


// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// 1. REGISTER a new user
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // HASH THE PASSWORD
        // We NEVER store plain text passwords. We "hash" them into a scrambled string.
        // The '10' is the salt rounds (higher = more secure but slower).
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. LOGIN an existing user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // COMPARE PASSWORDS
        // bcrypt compares the plain text password from req.body with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // GENERATE JWT (JSON Web Token)
        // If login is successful, we give the user a "Token" (like a VIP wristband).
        // They use this token for future requests to prove they are logged in.
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload (data inside the token)
            JWT_SECRET,                              // Secret key to sign the token
            { expiresIn: '1h' }                      // Token expires in 1 hour
        );

        res.json({
            message: 'Login successful!',
            token: token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Auth API running on http://localhost:${PORT}`);
});
