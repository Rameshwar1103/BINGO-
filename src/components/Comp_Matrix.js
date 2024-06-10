import React, { useState, useEffect } from 'react';

const ComputerControlledMatrix = (props) => {
  const [buttonColors, setButtonColors] = useState(new Array(25).fill('red'));
  const [count, setCount] = useState(0);
  const [showRandom,setshowRandom] = useState(null);


  useEffect(() => {
    const swapRandomly = (array, swaps) => {
      const newArray = [...array];
      for (let i = 0; i < swaps; i++) {
        const index1 = Math.floor(Math.random() * newArray.length);
        const index2 = Math.floor(Math.random() * newArray.length);
        [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
      }
      return newArray;
    };

    const newMatrix = swapRandomly(props.matrix2, 20 + Math.floor(Math.random() * 10));
    props.setMatrix2(newMatrix);
  }, []);

  useEffect(() => {
    if (props.clickedIndex != null) {
      const valueToMatch = props.matrix[props.clickedIndex];
      const matchedIndex = props.matrix2.indexOf(valueToMatch);
      if (matchedIndex !== -1) {
        setButtonColors(currentColors => {
          const newColors = [...currentColors];
          newColors[matchedIndex] = 'pink';
          return newColors;
        });
      }
    }
  }, [props.clickedIndex, props.matrix2, props.matrix]);

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
      diagonal1.push(buttonColors[i * (matrixSize + 1)]);
      diagonal2.push(buttonColors[(matrixSize - 1) * (i + 1)]);
    }
    if (diagonal1.every(color => color === 'pink')) {
      completeDiagonals++;
    }
    if (diagonal2.every(color => color === 'pink')) {
      completeDiagonals++;
    }

    setCount(completeRows + completeColumns + completeDiagonals);
    if(completeRows + completeColumns + completeDiagonals=== 5)
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
            style={{
              width: '90px',
              height: '90px',
              textAlign: 'center',
              backgroundColor: buttonColors[index],
            }}
          >
            {props.matrix2[index]}
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
      <h3>Score: {count}    </h3>
      
    </div>
  );
};

export default ComputerControlledMatrix;
