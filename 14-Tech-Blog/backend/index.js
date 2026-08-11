require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_blog')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB error:', err));

// ==========================================
// POST ROUTES
// ==========================================

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single post by ID (and include its comments)
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Fetch all comments where postId matches the current post
        const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: 1 });

        // Return both the post and its comments
        res.json({ post, comments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ==========================================
// COMMENT ROUTES
// ==========================================

// Add a comment to a specific post
app.post('/api/posts/:id/comments', async (req, res) => {
    try {
        const { text, author } = req.body;
        const newComment = new Comment({
            postId: req.params.id, // We get the Post ID from the URL
            text,
            author
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Tech Blog Backend running on http://localhost:${PORT}`);
});
