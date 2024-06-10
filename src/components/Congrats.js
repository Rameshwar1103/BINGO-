import React from 'react';
import './Congratulations.css'; // Import the CSS file for styling

const Congratulations = (props) => {
    
const Restart =()=>{
    props.restoreMatrix();
    props.handleIndexClick(null);
    props.anounceWinner("NO");
}
  return (
    <div className='container my-4 congratulations-container'>
      <div className='congratulations-content'>
        <h1 className='congratulations-title'>Congratulations!</h1>
        <p className='congratulations-message'>Y{props.winnerName} won the game!</p>
        <button className='play-again-button' onClick={Restart}>Play Again</button>
      </div>
    </div>
  );
};

export default Congratulations;
