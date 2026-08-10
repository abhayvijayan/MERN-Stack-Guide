require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid'); // Library to generate short unique IDs
const Url = require('./models/Url');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/url_shortener')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));


// ==========================================
// URL SHORTENER ROUTES
// ==========================================

// 1. Create a Short URL
app.post('/api/shorten', async (req, res) => {
    const { longUrl } = req.body;

    // Basic URL validation (checking if it starts with http/https)
    if (!longUrl || (!longUrl.startsWith('http://') && !longUrl.startsWith('https://'))) {
        return res.status(400).json({ error: 'Invalid URL. Must start with http:// or https://' });
    }

    try {
        // Check if we already shortened this URL before
        let url = await Url.findOne({ longUrl });

        if (url) {
            // If it exists, just return the existing one
            return res.json(url);
        } else {
            // Create a short code (e.g., "bV8s9j")
            const urlCode = shortid.generate();
            const shortUrl = `${BASE_URL}/${urlCode}`;

            // Save to database
            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                clicks: 0
            });

            await url.save();
            return res.json(url);
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. Redirect to Long URL
// When a user visits http://localhost:3000/bV8s9j, they trigger this route
app.get('/:code', async (req, res) => {
    try {
        // Find the URL by its short code
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            // Increment the click counter
            url.clicks++;
            await url.save();

            // Redirect the user to the original long URL
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({ error: 'No URL found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`URL Shortener running on ${BASE_URL}`);
});
