require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// ==========================================
// DATABASE CONNECTION
// ==========================================
// We use mongoose.connect() to connect to our MongoDB database.
// The connection string is stored in a .env file for security.
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/book_library')
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((err) => console.error('MongoDB connection error:', err));


// ==========================================
// CRUD ROUTES (Create, Read, Update, Delete)
// ==========================================

// 1. CREATE a new book (POST)
app.post('/books', async (req, res) => {
    try {
        // Create a new Book instance with data from the request body
        const newBook = new Book(req.body);
        
        // Save it to the database
        const savedBook = await newBook.save();
        
        res.status(201).json(savedBook);
    } catch (err) {
        // If validation fails (e.g. missing title), it will throw an error
        res.status(400).json({ error: err.message });
    }
});

// 2. READ all books (GET)
app.get('/books', async (req, res) => {
    try {
        // .find() with empty object {} returns all documents in the collection
        const books = await Book.find({});
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. READ a single book by ID (GET)
// :id is a route parameter. We access it via req.params.id
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. UPDATE a book by ID (PUT)
app.put('/books/:id', async (req, res) => {
    try {
        // findByIdAndUpdate takes 3 arguments: ID, update data, and options
        // { new: true } ensures we get the updated document back instead of the old one
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. DELETE a book by ID (DELETE)
app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        
        res.json({ message: 'Book successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Book Library API running on http://localhost:${PORT}`);
});
