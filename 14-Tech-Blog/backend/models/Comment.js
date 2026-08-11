const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // This is the relational link! We store the ObjectId of the parent Post.
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        required: true 
    },
    text: { type: String, required: true },
    author: { type: String, default: 'Anonymous' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
