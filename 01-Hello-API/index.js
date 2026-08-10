// 1. Import the express module.
// 'express' is a fast, unopinionated, minimalist web framework for Node.js.
const express = require('express');

// 2. Initialize the express application.
// This 'app' object will be used to setup routes and start the server.
const app = express();

// 3. Define a port number where our server will listen for requests.
// We typically use 3000, 5000, or 8080 for local development.
const PORT = 3000;

// 4. Create a route.
// A route is like a URL path. When a user visits this path, we run the provided function.
// Here we define a GET request for the root path ('/').
// The callback function takes two arguments: 'req' (the incoming request) and 'res' (our response to the client).
app.get('/', (req, res) => {
    // We send back a JSON response.
    // JSON (JavaScript Object Notation) is the standard format for sending data on the web.
    res.json({
        message: "Hello World! Welcome to your first API.",
        success: true
    });
});

// 5. Another example route
// Try visiting http://localhost:3000/about
app.get('/about', (req, res) => {
    res.json({
        message: "This is the about route.",
        version: "1.0.0"
    });
});

// 6. Start the server.
// We tell the 'app' to listen on the specified port. 
// When it successfully starts, it will execute the callback function (printing to the console).
app.listen(PORT, () => {
    console.log(`Server is running! You can view it at: http://localhost:${PORT}`);
});
