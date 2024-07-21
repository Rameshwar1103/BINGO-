import React, {useEffect, useContext } from 'react';
import Progress from './Progress';
import { NewContext } from '../context/Context';

const PlayMatrix = () => {
  
 
  const {
    matrix, matrix2, handleIndexClick, clickedIndex2, announceWinner, setWinner, turn, setTurn,count, count2, setCount2,
    buttonColors, setButtonColors,
    isDisabled, setIsDisabled
  } = useContext(NewContext);

  const handleclick = () => {
    checkCompletedLines();
    if (turn === "user" && !isDisabled) {
      setIsDisabled(true); // Disable all buttons
      setTurn("comp");
    }

  };

  const handleButtonClick = (index) => {

    setButtonColors(currentColors => {
        const newColors = [...currentColors];
        newColors[index] = 'pink';
        return newColors;
      });
    handleIndexClick(index); // Set the selected index
    // You can perform other actions here if needed
    handleclick();

  };

  useEffect(() => {
    if (turn === "uuuu" && clickedIndex2 != null) {
      const valueToMatch = matrix2[clickedIndex2];
      const matchedIndex = matrix.indexOf(valueToMatch);
      if (matchedIndex !== -1) {
        setButtonColors(currentColors => {
          const newColors = [...currentColors];
          newColors[matchedIndex] = 'pink';
          return newColors;
        });
        setTurn("user");
      }
    }
  }, [turn, clickedIndex2, matrix, matrix2]);
 
  const checkCompletedLines = () => {
    const matrixSize = 5; // Assuming a 5x5 matrix
    let completeRows = 0;
    let completeColumns = 0;
    let completeDiagonals = 0;

    // Check rows
    for (let i = 0; i < matrixSize; i++) {
      if (buttonColors.slice(i * matrixSize, (i + 1) * matrixSize).every(color => color === 'pink')) {
        completeRows++;
      }
    }

    // Check columns
    for (let i = 0; i < matrixSize; i++) {
      let column = [];
      for (let j = 0; j < matrixSize; j++) {
        column.push(buttonColors[i + j * matrixSize]);
      }
      if (column.every(color => color === 'pink')) {
        completeColumns++;
      }
    }

    // Check diagonals
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < matrixSize; i++) {
      diagonal1.push(buttonColors[i + i * matrixSize]);
      diagonal2.push(buttonColors[(matrixSize - 1) * (i + 1)]);
    }
    if (diagonal1.every(color => color === 'pink')) {
      completeDiagonals++;
    }
    if (diagonal2.every(color => color === 'pink')) {
      completeDiagonals++;
    }

    setCount2(completeRows+completeColumns+completeDiagonals);
    if(completeRows + completeColumns + completeDiagonals >= 5)
      {
        announceWinner("Yes");
        setWinner("User");
      }
  };

  useEffect(() => {
    checkCompletedLines();
  }, [buttonColors]);

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
              border:matrix[index]===matrix2[clickedIndex2]?"5px solid skyblue":""
            }}
            disabled={isDisabled}
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
      <Progress cnt="player"/>
    </div>
  );
};

export default PlayMatrix;