import React, {  useContext, useState } from 'react';
import PlayMatrix from './PlayMatrix';
import Progress from './Progress';
import "./boxstyle.css";
import { NewContext } from '../context/Context';
 

const Matrix = () => {

  const {   matrix,count,count2,matrix2,clickedIndex2,
  setMatrix,
  selectedButton, setSelectedButton,
  finalized, setFinalized } = useContext(NewContext);

  const handleButtonClick = (index) => {
    if (!finalized) {
      if (selectedButton === null) {
        setSelectedButton(index);
      } else {
        const newMatrix = [...matrix];
        [newMatrix[selectedButton], newMatrix[index]] = [newMatrix[index], newMatrix[selectedButton]];
        setMatrix(newMatrix);
        setSelectedButton(null);
      }
    }
  };
  const swapAutomatically = ()=>{
    const swapRandomly = (array, swaps) => {
      const newArray = [...array];
      for (let i = 0; i < swaps; i++) {
        const index1 = Math.floor(Math.random() * newArray.length);
        const index2 = Math.floor(Math.random() * newArray.length);
        [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
      }
      return newArray;
    };

    const newMatrix = swapRandomly(matrix, 20 + Math.floor(Math.random() * 10));
    setMatrix(newMatrix);
    setFinalized(true);
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
            {matrix[index]}
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
        <PlayMatrix />
      ) : (
        <div>{renderMatrix()}</div>
      )}
      <div className="box" style={{fontSize:"48px",color:"white",display:finalized?"none":"flex"}}>B  I  N  G  O</div>
    </div>

    <div >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
     
    <button onClick={swapAutomatically} hidden={finalized} style={{ marginTop: '20px', padding: '10px 20px',borderRadius:"5%" }}>Jumble Matrix</button>
    <button onClick={handleFinalize} hidden={finalized} style={{ marginTop: '20px', padding: '10px 20px',borderRadius:"5%" }}>
      Finalize Matrix
     </button>
     {/* <div style={{height:"100px",width:"200px",color:"black",backgroundColor:"white",marginTop: '20px',display:finalized?"":"none",textAlign:"center",fontSize:"48px",alignContent:"center"}}>{matrix2[clickedIndex2]}</div> */}
     <div style={{height:"100px",width:"200px",color:"black", marginTop: '20px',display:finalized?"flex":"none",flexDirection:"row" }}>
      
        <div  style={{ height:"100px",width:"100px",alignContent:"center",textAlign:"center",fontSize:"48px",borderRadius:"50%",textShadow:"2px 2px 4px cyan",border:"2px solid green"}}>
          {count2}
        </div>
        <div style={{height:"100px",width:"100px",alignContent:"center",textAlign:"center",fontSize:"48px",marginLeft:"10px",borderRadius:"50%",textShadow:"2px 2px 4px cyan",border:"2px solid red"}}>
          {count}
        </div>
     </div>

     </div>
     
     </div>
    </>
  );
};

export default Matrix;