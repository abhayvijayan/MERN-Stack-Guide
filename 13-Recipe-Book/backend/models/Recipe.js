const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    imageUrl: { type: String } // We will store the path to the uploaded image here
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
