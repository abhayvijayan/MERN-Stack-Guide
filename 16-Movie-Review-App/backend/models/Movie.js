const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
