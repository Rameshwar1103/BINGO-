import React, { useState } from 'react';

import PlayMatrix from './PlayMatrix';

const Matrix = (props) => {
 
  const [selectedButton, setSelectedButton] = useState(null);
  const [finalized, setFinalized] = useState(false);
  


  const handleButtonClick = (index) => {
    if (!finalized) {
      if (selectedButton === null) {
        setSelectedButton(index);
      } else {
        const newMatrix = [...props.matrix];
        [newMatrix[selectedButton], newMatrix[index]] = [newMatrix[index], newMatrix[selectedButton]];
        props.setMatrix(newMatrix);
        setSelectedButton(null);
      }
    }
  };
  
  const handleFinalize = () => {
    setFinalized(true);
   
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
            disabled={finalized}
            style={{
              width: '90px',
              height: '90px',
              textAlign: 'center',
              backgroundColor: finalized ? 'black' : selectedButton === index ? 'lightblue' : 'green',
              color: finalized ? 'white' : 'black'
            }}
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
    <>
    <div>
      {finalized ? (
        <PlayMatrix matrix={props.matrix} matrix2={props.matrix2}clickedIndex ={props.clickedIndex} onButtonClick={props.onButtonClick} anounceWinner={props.anounceWinner} setwinner={props.setwinner} turn={props.turn} setturn={props.setturn}/>
      ) : (
        <div>{renderMatrix()}</div>
      )}
      
    </div>
    <button onClick={handleFinalize} disabled={finalized} style={{ marginTop: '20px', padding: '10px 20px' }}>
    Finalize Matrices
  </button>
    </>
  );
};

export default Matrix;
