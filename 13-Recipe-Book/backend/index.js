require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Recipe = require('./models/Recipe');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the 'uploads' directory as a static folder so the frontend can access images via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_recipes')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));

// ==========================================
// MULTER CONFIGURATION FOR IMAGE UPLOADS
// ==========================================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // We will store uploaded images in the 'uploads' folder
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // Ensure filenames are unique by adding the current date
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// ==========================================
// ROUTES
// ==========================================

// GET all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new recipe (with image upload)
// 'upload.single('image')' middleware intercepts the request and handles the file upload
// The field name in the frontend FormData MUST be 'image'
app.post('/api/recipes', upload.single('image'), async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        
        // req.file is populated by Multer. We save its path to the database.
        const imageUrl = req.file ? req.file.path : null;

        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            imageUrl
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create 'uploads' folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

app.listen(PORT, () => {
    console.log(`Recipe Book Backend running on http://localhost:${PORT}`);
});
