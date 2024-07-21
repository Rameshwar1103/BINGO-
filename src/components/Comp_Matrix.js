import React, { useState, useEffect, useContext } from 'react';
import Progress from './Progress';
import { NewContext } from '../context/Context';
const ComputerControlledMatrix = ( ) => {
  
  const {  matrix, 
  matrix2, 
  setMatrix2,
  clickedIndex, 
  clickedIndex2,
  handleIndexClick2,
  announceWinner,
  setWinner,
  turn,
  setTurn,
  buttonColors, setButtonColors,
  count, setCount,
  buttonColors2, setButtonColors2,
  isDisabled,setIsDisabled} = useContext(NewContext);

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

    const newMatrix = swapRandomly(matrix2, 20 + Math.floor(Math.random() * 10));
    setMatrix2(newMatrix);
  }, []);
  
  const chooseStrategicButton = (matchedIndex) => {
    
    if (turn === "comp") {
      buttonColors2[matchedIndex] = 'pink';
      const nonPinkIndices = buttonColors2
        .map((color, index) => (color !== 'pink')? index : null)
        .filter(index => index !== null);

      if (nonPinkIndices.length > 0) {
        const matrixSize = 5;
        const priorityArray = new Array(25).fill(0);

        // Calculate pink buttons in rows, columns, and diagonals
        const rowCount = new Array(matrixSize).fill(0);
        const colCount = new Array(matrixSize).fill(0);
        let diag1Count = 0;
        let diag2Count = 0;

        buttonColors2.forEach((color, index) => {
          const row = Math.floor(index / matrixSize);
          const col = index % matrixSize;
          if (color === 'pink') {
            rowCount[row]++;
            colCount[col]++;
            if (row === col) diag1Count++;
            if (row + col === matrixSize - 1) diag2Count++;
          }
        });
        
        console.log(nonPinkIndices); 

        // Assign priority to each non-pink button based on the value in matrix2
        nonPinkIndices.forEach(index => {
          const value = matrix2[index];
          const row = Math.floor(index / matrixSize);
          const col = index % matrixSize;
          priorityArray[index] += rowCount[row] + colCount[col];
          if (row === col) priorityArray[index] += diag1Count;
          if (row + col === matrixSize - 1) priorityArray[index] += diag2Count;
        });

        console.log("priority arr",priorityArray);

        // Find the index with the highest priority value
        let maxPriorityIndex = nonPinkIndices.reduce((maxIndex, currentIndex) =>
          priorityArray[currentIndex] > priorityArray[maxIndex] ? currentIndex : maxIndex,
          nonPinkIndices[0]
        );
         
        console.log(maxPriorityIndex);
        // Ensure to complete a line if almost completed
        const checkAlmostComplete = (indices) => {
          return indices.filter(index => buttonColors2[index] === 'pink').length === 4;
        };
        console.log(maxPriorityIndex);
        // Rows
        for (let i = 0; i < matrixSize; i++) {
          const rowIndices = [...Array(matrixSize)].map((_, j) => i * matrixSize + j);
          if (checkAlmostComplete(rowIndices)) {
            maxPriorityIndex = rowIndices.find(index => buttonColors2[index] !== 'pink');
            break;
          }
        }
        console.log(maxPriorityIndex);
        // Columns
        for (let i = 0; i < matrixSize; i++) {
          const colIndices = [...Array(matrixSize)].map((_, j) => j * matrixSize + i);
          if (checkAlmostComplete(colIndices)) {
            maxPriorityIndex = colIndices.find(index => buttonColors2[index] !== 'pink');
            break;
          }
        }
        console.log(maxPriorityIndex);
        // Diagonals
        const diag1Indices = [...Array(matrixSize)].map((_, i) => i * (matrixSize + 1));
        const diag2Indices = [...Array(matrixSize)].map((_, i) => (i + 1) * (matrixSize - 1));
        if (checkAlmostComplete(diag1Indices)) {
          maxPriorityIndex = diag1Indices.find(index => buttonColors2[index] !== 'pink');
        } else if (checkAlmostComplete(diag2Indices)) {
          maxPriorityIndex = diag2Indices.find(index => buttonColors2[index] !== 'pink');
        }
        console.log(maxPriorityIndex);
        // Update button color and switch turn
        setButtonColors2(currentColors => {
          const newColors = [...currentColors];
          newColors[maxPriorityIndex] = 'pink';
          return newColors;
        });
        
        handleIndexClick2(maxPriorityIndex);
        console.log(maxPriorityIndex);
        setTurn("uuuu");
      }
    }
  };

  useEffect(() => {
    if (clickedIndex != null) {
      const valueToMatch = matrix[clickedIndex];
      const matchedIndex = matrix2.indexOf(valueToMatch);
       let newColors ;
      if (matchedIndex !== -1) {
        setButtonColors2(currentColors => {
          newColors = [...currentColors];
          newColors[matchedIndex] = 'pink';
          return newColors;
        });
      }
      
      setTimeout(() => {
        chooseStrategicButton(matchedIndex);
        setIsDisabled(false); // Enable after timeout
      }, 2000);
      
    }
  }, [clickedIndex, matrix2, matrix]);

  // useEffect(() => {
  //   if (turn === "comp") {
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
  //       handleIndexClick2(randomIndex);
  //       setturn("uuuu");
  //       console.log(turn,clickedIndex2);
  //     }
  //   }
  // }, [turn, buttonColors]);
 

  const checkCompletedLines = () => {
    const matrixSize = 5; // Assuming a 5x5 matrix
    let completeRows = 0;
    let completeColumns = 0;
    let completeDiagonals = 0;

    // Check rows
    for (let i = 0; i < matrixSize; i++) {
      if (buttonColors2.slice(i * matrixSize, (i + 1) * matrixSize).every(color => color === 'pink')) {
        completeRows++;
      }
    }

    // Check columns
    for (let i = 0; i < matrixSize; i++) {
      let column = [];
      for (let j = 0; j < matrixSize; j++) {
        column.push(buttonColors2[i + j * matrixSize]);
      }
      if (column.every(color => color === 'pink')) {
        completeColumns++;
      }
    }

    // Check diagonals
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < matrixSize; i++) {
      diagonal1.push(buttonColors2[i * (matrixSize + 1)]);
      diagonal2.push(buttonColors2[(matrixSize - 1) * (i + 1)]);
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
        announceWinner("Yes");
        setWinner("Comp");
      }
  };

  useEffect(() => {
    checkCompletedLines();
  }, [buttonColors2]);

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
              backgroundColor: buttonColors2[index],
              border:matrix2[index]===matrix2[clickedIndex2]?"5px solid green":""
            }}
          >
          {matrix2[index]}
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
      <Progress cnt="computer"/>

    </div>
  );
};

export default ComputerControlledMatrix;