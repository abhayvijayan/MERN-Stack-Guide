const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['Todo', 'In Progress', 'Done'],
        default: 'Todo'
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
