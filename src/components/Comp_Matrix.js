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
  
  const chooseStrategicButton = () => {
    if (props.turn === "comp") {
      const nonPinkIndices = buttonColors
        .map((color, index) => color !== 'pink' ? index : null)
        .filter(index => index !== null);

      if (nonPinkIndices.length > 0) {
        const matrixSize = 5;
        const priorityArray = new Array(25).fill(0);

        // Calculate pink buttons in rows, columns, and diagonals
        const rowCount = new Array(matrixSize).fill(0);
        const colCount = new Array(matrixSize).fill(0);
        let diag1Count = 0;
        let diag2Count = 0;

        buttonColors.forEach((color, index) => {
          const row = Math.floor(index / matrixSize);
          const col = index % matrixSize;
          if (color === 'pink') {
            rowCount[row]++;
            colCount[col]++;
            if (row === col) diag1Count++;
            if (row + col === matrixSize - 1) diag2Count++;
          }
        });

        // Assign priority to each non-pink button based on the value in props.matrix2
        nonPinkIndices.forEach(index => {
          const value = props.matrix2[index];
          const row = Math.floor(index / matrixSize);
          const col = index % matrixSize;
          priorityArray[index] += rowCount[row] + colCount[col];
          if (row === col) priorityArray[index] += diag1Count;
          if (row + col === matrixSize - 1) priorityArray[index] += diag2Count;
        });

        // Find the index with the highest priority value
        let maxPriorityIndex = nonPinkIndices.reduce((maxIndex, currentIndex) =>
          priorityArray[currentIndex] > priorityArray[maxIndex] ? currentIndex : maxIndex,
          nonPinkIndices[0]
        );

        // Ensure to complete a line if almost completed
        const checkAlmostComplete = (indices) => {
          return indices.filter(index => buttonColors[index] === 'pink').length === 4;
        };

        // Rows
        for (let i = 0; i < matrixSize; i++) {
          const rowIndices = [...Array(matrixSize)].map((_, j) => i * matrixSize + j);
          if (checkAlmostComplete(rowIndices)) {
            maxPriorityIndex = rowIndices.find(index => buttonColors[index] !== 'pink');
            break;
          }
        }
        // Columns
        for (let i = 0; i < matrixSize; i++) {
          const colIndices = [...Array(matrixSize)].map((_, j) => j * matrixSize + i);
          if (checkAlmostComplete(colIndices)) {
            maxPriorityIndex = colIndices.find(index => buttonColors[index] !== 'pink');
            break;
          }
        }
        // Diagonals
        const diag1Indices = [...Array(matrixSize)].map((_, i) => i * (matrixSize + 1));
        const diag2Indices = [...Array(matrixSize)].map((_, i) => (i + 1) * (matrixSize - 1));
        if (checkAlmostComplete(diag1Indices)) {
          maxPriorityIndex = diag1Indices.find(index => buttonColors[index] !== 'pink');
        } else if (checkAlmostComplete(diag2Indices)) {
          maxPriorityIndex = diag2Indices.find(index => buttonColors[index] !== 'pink');
        }

        // Update button color and switch turn
        setButtonColors(currentColors => {
          const newColors = [...currentColors];
          newColors[maxPriorityIndex] = 'pink';
          return newColors;
        });

        props.handleIndexClick2(maxPriorityIndex);
        props.setturn("uuuu");
      }
    }
  };

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
      chooseStrategicButton();
    }
  }, [props.clickedIndex, props.matrix2, props.matrix]);

  // useEffect(() => {
  //   if (props.turn === "comp") {
  //     const nonPinkIndices = buttonColors
  //       .map((color, index) => color !== 'pink' ? index : null)
  //       .filter(index => index !== null);

  //     if (nonPinkIndices.length > 0) {
  //       const randomIndex = nonPinkIndices[Math.floor(Math.random() * nonPinkIndices.length)];
  //       setButtonColors(currentColors => {
  //         const newColors = [...currentColors];
  //         newColors[randomIndex] = 'pink';
  //         return newColors;
  //       });
  //       props.handleIndexClick2(randomIndex);
  //       props.setturn("uuuu");
  //       console.log(props.turn,props.clickedIndex2);
  //     }
  //   }
  // }, [props.turn, buttonColors]);
 

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
    if(completeRows + completeColumns + completeDiagonals >= 5)
      {
        props.anounceWinner("Yes");
        props.setwinner("Comp");
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