require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/Project');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_portfolio')
    .then(() => {
        console.log('Connected to MongoDB!');
        seedProjects();
    })
    .catch((err) => console.error('MongoDB error:', err));


async function seedProjects() {
    const count = await Project.countDocuments();
    if (count === 0) {
        await Project.insertMany([
            { title: 'Weather App', description: 'A cool app', techStack: ['React', 'Node'], link: 'https://github.com' },
            { title: 'E-Commerce', description: 'Online store', techStack: ['MERN', 'Stripe'], link: 'https://github.com' }
        ]);
        console.log('Database seeded with sample projects!');
    }
}

// ==========================================
// ROUTES
// ==========================================

// GET all projects (For the public portfolio page)
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new project (For the hidden admin dashboard)
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST a message (Contact Form on public page)
app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all messages (For the hidden admin dashboard)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Portfolio Backend running on http://localhost:${PORT}`);
});
