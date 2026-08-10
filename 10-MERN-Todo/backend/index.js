require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS allows our frontend to communicate with our backend
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// We must enable CORS so the React app (running on port 5173) can make requests to Express (running on port 5000)
app.use(cors()); 
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_todo')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));


// ==========================================
// ROUTES
// ==========================================

// GET all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); // Newest first
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({ text: req.body.text });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT (Toggle complete status)
app.put('/api/todos/:id', async (req, res) => {
    try {
        // Find the todo to get its current 'completed' status
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        // Flip the boolean
        todo.completed = !todo.completed;
        await todo.save();
        
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
