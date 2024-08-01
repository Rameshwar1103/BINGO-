const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
  methods: ['GET', 'POST'],
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your React app's URL
    methods: ["GET", "POST"],
    credentials: true // Allow credentials for WebSocket connections
  }
});


const PORT = process.env.PORT || 3001;


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('playerMove', (index) => {
    socket.broadcast.emit('opponentMove', index);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
