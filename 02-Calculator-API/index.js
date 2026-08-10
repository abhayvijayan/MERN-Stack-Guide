const express = require('express');
const app = express();
const PORT = 3000;

// This time, we will learn how to extract data from the URL.
// We use Query Parameters. For example: /add?num1=5&num2=10
// Everything after the '?' are query parameters.

app.get('/add', (req, res) => {
    // We can access query parameters using req.query
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    // By default, query parameters are strings. 
    // We must convert them to Numbers before doing math, otherwise "5" + "10" = "510"
    const n1 = Number(num1);
    const n2 = Number(num2);

    // Validation: Check if the user actually provided valid numbers
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({
            error: "Please provide valid numbers for num1 and num2."
        });
    }

    const result = n1 + n2;

    res.json({
        operation: 'addition',
        num1: n1,
        num2: n2,
        result: result
    });
});

app.get('/subtract', (req, res) => {
    const n1 = Number(req.query.num1);
    const n2 = Number(req.query.num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: "Please provide valid numbers." });
    }

    res.json({
        operation: 'subtraction',
        num1: n1,
        num2: n2,
        result: n1 - n2
    });
});

app.listen(PORT, () => {
    console.log(`Calculator API running on http://localhost:${PORT}`);
});
