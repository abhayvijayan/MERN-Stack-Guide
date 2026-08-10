const mongoose = require('mongoose');

// 1. Define the Schema
// A Schema acts as a blueprint for how our data should look in the database.
// It enforces structure and data types (unlike raw MongoDB which is schemaless).
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // This field is mandatory
        trim: true      // Removes whitespace from ends
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number
    },
    genre: {
        type: String
    }
}, { 
    // Automatically adds 'createdAt' and 'updatedAt' timestamps
    timestamps: true 
});

// 2. Create the Model
// A Model is a compiled version of the Schema. It provides all the methods 
// needed to interact with the database (e.g., .find(), .save(), .deleteOne()).
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
