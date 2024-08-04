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

let userList = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle player move (example of game-specific event)
  socket.on('playerMove', (index) => {
    socket.broadcast.emit('opponentMove', index);
  });
  
  let Username ;
  // Listen for the 'username' event
  socket.on('username', (username) => {
    // Store the username along with the socket.id
    Username = username;
    const userEntry = { id: socket.id, name: username };
    userList.push(userEntry);
    io.emit('updateUserList', userList);
    console.log(userList);
  });

  // Listen for the 'sendInvite' event
  socket.on('sendInvite', (invitedPlayer) => {
    // Check if the invited player is online (you can add more logic here)
    const recipient = userList.find((user) => user.name === invitedPlayer);
    console.log("The recepeint",recipient);
    if (recipient) {
      // Notify the recipient about the invite
      io.to(recipient.id).emit('receiveInvite',Username );
    } else {
      // Handle the case when the invited player is not online
      // You can show an error message or take other actions
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
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
