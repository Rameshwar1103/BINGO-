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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

let userList = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  let Username;

  socket.on('username', (username) => {
    Username = username;
    const userEntry = { id: socket.id, name: username };
    userList.push(userEntry);
    io.emit('updateUserList', userList);
    console.log(`User connected: ${username}`);
  });

  socket.on('sendInvite', (invitedPlayer) => {
    const recipient = userList.find((user) => user.name === invitedPlayer);
    if (recipient) {
      io.to(recipient.id).emit('receiveInvite', Username);
    }
  });

  socket.on('acceptInvite', (invitingPlayer) => {
    const invitedPlayer = userList.find(user => user.id === socket.id)?.name;
    const invitingUser = userList.find(user => user.name === invitingPlayer);
    if (invitingUser && invitedPlayer) {
      io.to(invitingUser.id).emit('joinGame');
      io.to(socket.id).emit('joinGame');
    }
  });

  socket.on('playerMove', (index) => {
    socket.broadcast.emit('opponentMove', index);
  });

  socket.on('disconnect', () => {
    userList = userList.filter(user => user.id !== socket.id);
    io.emit('updateUserList', userList);
    console.log(`User disconnected: ${Username}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
