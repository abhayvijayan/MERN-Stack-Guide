require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/Movie');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_movies')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));

// ==========================================
// ROUTES (With Pagination & Filtering)
// ==========================================

// GET movies
app.get('/api/movies', async (req, res) => {
    try {
        // 1. Extract query parameters from URL (e.g., ?genre=Action&page=2&limit=5)
        const { genre, page = 1, limit = 5 } = req.query;

        // 2. Build the filter object
        const filter = {};
        if (genre && genre !== 'All') {
            filter.genre = genre;
        }

        // 3. Calculate pagination math
        const skip = (page - 1) * limit;

        // 4. Execute query with Mongoose methods .skip() and .limit()
        const movies = await Movie.find(filter)
                                  .sort({ createdAt: -1 })
                                  .skip(skip)
                                  .limit(Number(limit));

        // 5. Get the total count of documents that match the filter (for frontend calculations)
        const totalMovies = await Movie.countDocuments(filter);
        const totalPages = Math.ceil(totalMovies / limit);

        res.json({
            movies,
            currentPage: Number(page),
            totalPages
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new movie
app.post('/api/movies', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a movie
app.delete('/api/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Movie App Backend running on http://localhost:${PORT}`);
});
