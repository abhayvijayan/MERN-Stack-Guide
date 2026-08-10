const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Value must be one of these two strings
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
