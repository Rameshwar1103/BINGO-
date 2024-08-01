import React, { useEffect, useContext } from 'react';
import Progress from './Progress';
import { NewContext } from '../context/Context';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', { withCredentials: true });

const PlayerMatrix = () => {
  const {
    matrix, handleIndexClick, announceWinner, setWinner, turn, setTurn,
    buttonColors, setButtonColors, isDisabled, setIsDisabled
  } = useContext(NewContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('opponentMove', (index) => {
      handleOpponentMove(index);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('opponentMove');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleButtonClick = (index) => {
    if (turn !== "user" || isDisabled) return;
    
    setButtonColors(currentColors => {
      const newColors = [...currentColors];
      newColors[index] = 'pink';
      return newColors;
    });

    handleIndexClick(index);
    socket.emit('playerMove', index);
    setIsDisabled(true);
    setTurn("comp");
  };

  const handleOpponentMove = (index) => {
    setButtonColors(currentColors => {
      const newColors = [...currentColors];
      newColors[index] = 'lightblue';
      return newColors;
    });

    handleIndexClick(index);
    setIsDisabled(false);
    setTurn('user');
  };

  const renderMatrix = () => {
    let rows = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j;
        row.push(
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              width: '90px',
              height: '90px',
              textAlign: 'center',
              backgroundColor: buttonColors[index],
              color: 'white',
              border: matrix[index] ? "5px solid skyblue" : ""
            }}
            disabled={isDisabled || turn !== "user"}
          >
            {matrix[index]}
          </button>
        );
      }
      rows.push(<div key={i} style={{ display: 'flex' }}>{row}</div>);
    }
    return rows;
  };

  return (
    <div>
      <div>{renderMatrix()}</div>
      <Progress cnt="player" />
    </div>
  );
};

export default PlayerMatrix;
