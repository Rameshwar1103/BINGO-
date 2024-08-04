import React, { useEffect, useState, useContext } from 'react';
import './LoginPage.css';
import { NewContext } from '../context/Context';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', { withCredentials: true });

const Login = () => {
  const { player1, setPlayer1, player2, setPlayer2, userList, setUserList } = useContext(NewContext);
  const [username, setUsername] = useState('');
  const [invitedPlayer, setInvitedPlayer] = useState('');

  useEffect(() => {
    // Listening for the updateUserList event to update the user list
    socket.on('updateUserList', (users) => {
      setUserList(users);
    });

    // Listening for the receiveInvite event
    socket.on('receiveInvite', (invitingPlayer) => {
      const accept = window.confirm(`You have received an invite from ${invitingPlayer}. Do you want to accept?`);
      if (accept) {
        socket.emit('acceptInvite', invitingPlayer);
      } else {
        alert('You declined the invite.');
      }
    });

    // Listening for the joinGame event
    socket.on('joinGame', () => {
      window.location.href = '/Playground2';
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('updateUserList');
      socket.off('receiveInvite');
      socket.off('joinGame');
    };
  }, [setUserList]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = () => {
    if (username.trim()) {
      setPlayer1(username);
      socket.emit('username', username);
      alert(`${username} has logged in. You can now invite a player.`);
    } else {
      alert('Please enter a username.');
    }
  };

  const handleInvite = () => {
    if (invitedPlayer.trim()) {
      if (userList.some((user) => user.name === invitedPlayer)) {
        alert(`Invite sent to ${invitedPlayer}. Ask them to accept the invite.`);
        socket.emit('sendInvite', invitedPlayer);
      } else {
        alert(`${invitedPlayer} is not a valid username. Please check the spelling.`);
      }
    } else {
      alert('Please enter the username of the player you want to invite.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome!</h1>
        <p className="login-subtitle">Enter your username to start playing</p>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
        />
        <button className="login-button" onClick={handleLogin}>Play</button>

        <p className="login-subtitle">Invite a Friend.</p>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={invitedPlayer}
          onChange={(event) => setInvitedPlayer(event.target.value)}
        />
        <button className="login-button" onClick={handleInvite}>Invite</button>
      </div>
    </div>
  );
};

export default Login;
