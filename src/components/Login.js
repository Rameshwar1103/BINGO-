// import React, { useEffect, useState, useContext } from 'react';
// import './LoginPage.css';
// import { NewContext } from '../context/Context';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001', { withCredentials: true });

// const Login = () => {
//   const { setPlayer1, setPlayer2,userList, setUserList } = useContext(NewContext);
//   const [username, setUsername] = useState('');
//   const [invitedPlayer, setInvitedPlayer] = useState('');

//   useEffect(() => {
//     socket.on('updateUserList', (users) => {
//       setUserList(users);
//     });

//     socket.on('receiveInvite', (invitingPlayer) => {
//       const accept = window.confirm(`You have received an invite from ${invitingPlayer}. Do you want to accept?`);
//       if (accept) {
//         socket.emit('acceptInvite', invitingPlayer);
//         setPlayer1(invitingPlayer); // Inviting player becomes Player1
//         setPlayer2(username); // Current user becomes Player2
//       } else {
//         alert('You declined the invite.');
//       }
//     });

//     socket.on('joinGame', () => {
//       window.location.href = '/Playground2';
//     });

//     return () => {
//       socket.off('updateUserList');
//       socket.off('receiveInvite');
//       socket.off('joinGame');
//     };
//   }, [setUserList, setPlayer1, setPlayer2, username]);

//   const handleInputChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleLogin = () => {
//     if (username.trim()) {
//       socket.emit('username', username);
//       alert(`${username} has logged in. You can now invite a player.`);
//     } else {
//       alert('Please enter a username.');
//     }
//   };

//   const handleInvite = () => {
//     if (invitedPlayer.trim()) {
//       if (userList.some((user) => user.name === invitedPlayer)) {
//         alert(`Invite sent to ${invitedPlayer}. Ask them to accept the invite.`);
//         socket.emit('sendInvite', invitedPlayer);
//         setPlayer1(username); // Current user becomes Player1
//         setPlayer2(invitedPlayer); // Invited player becomes Player2
//       } else {
//         alert(`${invitedPlayer} is not a valid username. Please check the spelling.`);
//       }
//     } else {
//       alert('Please enter the username of the player you want to invite.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h1 className="login-title">Welcome!</h1>
//         <p className="login-subtitle">Enter your username to start playing</p>
//         <input
//           type="text"
//           className="login-input"
//           placeholder="Username"
//           value={username}
//           onChange={handleInputChange}
//         />
//         <button className="login-button" onClick={handleLogin}>Play</button>

//         <p className="login-subtitle">Invite a Friend.</p>
//         <input
//           type="text"
//           className="login-input"
//           placeholder="Username"
//           value={invitedPlayer}
//           onChange={(event) => setInvitedPlayer(event.target.value)}
//         />
//         <button className="login-button" onClick={handleInvite}>Invite</button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from 'react'

function Login() {
  return (
    <div>
      
    </div>
  )
}

export default Login;
