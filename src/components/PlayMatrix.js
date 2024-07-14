import React, { useState,useEffect } from 'react';
import Comp_Matrix from './Comp_Matrix'; // Make sure to import Comp_Matrix

const PlayMatrix = (props) => {
  const [count, setCount] = useState(0);
  const [buttonColors, setButtonColors] = useState(new Array(25).fill('#32CD32'));
  const [isDisabled, setIsDisabled] = useState(false); 

  const handleclick = () => {
    checkCompletedLines();
    if (props.turn === "user" && !isDisabled) {
      setIsDisabled(true); // Disable all buttons
      setTimeout(() => setIsDisabled(false), 100);
      props.setturn("comp");
    }

  };

  const handleButtonClick = (index) => {

    setButtonColors(currentColors => {
        const newColors = [...currentColors];
        newColors[index] = 'pink';
        return newColors;
      });
    props.onButtonClick(index); // Set the selected index
    // You can perform other actions here if needed
    handleclick();

  };

  useEffect(() => {
    if (props.turn === "uuuu" && props.clickedIndex2 != null) {
      const valueToMatch = props.matrix2[props.clickedIndex2];
      const matchedIndex = props.matrix.indexOf(valueToMatch);
      if (matchedIndex !== -1) {
        setButtonColors(currentColors => {
          const newColors = [...currentColors];
          newColors[matchedIndex] = 'pink';
          return newColors;
        });
        props.setturn("user");
      }
      console.log(props.clickedIndex2,props.turn);
    }
  }, [props.turn, props.clickedIndex2, props.matrix, props.matrix2]);
 
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

    setCount(completeRows+completeColumns+completeDiagonals);
    if(completeRows + completeColumns + completeDiagonals >= 5)
      {
        props.anounceWinner("Yes");
        props.setwinner("User");
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
              color: 'white'
            }}
            disabled={isDisabled}
          >
            {props.matrix[index]}
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
      <h3>Score :{count}</h3>
    </div>
  );
};

export default PlayMatrix;