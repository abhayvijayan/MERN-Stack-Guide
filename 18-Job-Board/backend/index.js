require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Job = require('./models/Job');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_jobs')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));

// ==========================================
// MIDDLEWARE: Role Based Access Control (RBAC)
// ==========================================
// This is a simplified middleware. In a real app, you would use JWTs.
const requireAdmin = (req, res, next) => {
    // Check if the request headers contain our secret admin token
    const token = req.headers['authorization'];
    
    if (token === 'SecretAdminToken123') {
        next(); // User is admin, allow them to proceed to the route
    } else {
        res.status(403).json({ error: 'Access Denied: Admins Only' });
    }
};


// ==========================================
// ROUTES
// ==========================================

// GET all jobs (Public Route - anyone can view jobs)
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new job (Protected Route - only Admins)
app.post('/api/jobs', requireAdmin, async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a job (Protected Route - only Admins)
app.delete('/api/jobs/:id', requireAdmin, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Job Board Backend running on http://localhost:${PORT}`);
});
