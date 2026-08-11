require('dotenv').config();
const express = require('express');
const http = require('http'); // Node.js core module
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// 1. Create a regular HTTP server using the Express app
const server = http.createServer(app);

// 2. Wrap the HTTP server with Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow our React frontend to connect
        methods: ["GET", "POST"]
    }
});

// 3. Listen for connections
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Listen for a specific event from the client called 'send_message'
    socket.on('send_message', (data) => {
        // Broadcast the received message to EVERYONE who is connected
        io.emit('receive_message', data);
    });

    // Listen for disconnects
    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Socket.io Server running on http://localhost:${PORT}`);
});
