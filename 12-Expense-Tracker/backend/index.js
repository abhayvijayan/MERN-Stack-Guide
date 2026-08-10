require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Expense = require('./models/Expense');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_expenses')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));

// ==========================================
// ROUTES
// ==========================================

// GET all expenses
app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new expense/income
app.post('/api/expenses', async (req, res) => {
    try {
        const { description, amount, type } = req.body;
        const newRecord = new Expense({ description, amount, type });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a record
app.delete('/api/expenses/:id', async (req, res) => {
    try {
        const deletedRecord = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ error: 'Record not found' });
        res.json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Expense Tracker Backend running on http://localhost:${PORT}`);
});
