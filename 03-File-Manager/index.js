const express = require('express');
// Node.js built-in module for File System operations
const fs = require('fs'); 
// Node.js built-in module for working with file and directory paths
const path = require('path'); 

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies (important for POST requests)
app.use(express.json());

// Define the directory where we will store our text files.
// path.join(__dirname, 'data') ensures we get the correct absolute path.
const dataDir = path.join(__dirname, 'data');

// Ensure the 'data' directory exists when the server starts.
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// 1. GET route to read a file
// Example: /read?filename=hello.txt
app.get('/read', (req, res) => {
    const filename = req.query.filename;
    if (!filename) {
        return res.status(400).json({ error: "Please provide a filename query parameter." });
    }

    const filePath = path.join(dataDir, filename);

    // Read the file asynchronously
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // If the file doesn't exist, fs.readFile returns an error.
            return res.status(404).json({ error: "File not found!" });
        }
        res.json({ filename: filename, content: data });
    });
});

// 2. POST route to create a new file
// This introduces POST requests and sending JSON data in the Request Body.
app.post('/create', (req, res) => {
    // req.body contains the JSON data sent by the client.
    const { filename, content } = req.body;

    if (!filename || !content) {
        return res.status(400).json({ error: "Please provide both 'filename' and 'content' in the request body." });
    }

    const filePath = path.join(dataDir, filename);

    // Write the file asynchronously.
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to write file." });
        }
        res.json({ message: `File ${filename} created successfully!` });
    });
});

app.listen(PORT, () => {
    console.log(`File Manager API running on http://localhost:${PORT}`);
});
