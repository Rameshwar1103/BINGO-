import React, { useContext } from 'react';
// import './Congratulations.css'; // Import the CSS file for styling
import './VideoBackgroundBox.css';
import { NewContext } from '../context/Context';

const Congratulations = ( ) => { 
  const {restoreMatrix, setClickedIndex,setClickedIndex2,announceWinner,winnerName, } = useContext(NewContext);
const Restart =()=>{
    restoreMatrix();
    setClickedIndex(null);
    setClickedIndex2(null);
    announceWinner("NO");

}
  return (
    <div className="video-container">
      <div className='container my-4 congratulations-container'>
      <div className='congratulations-content'>
        <h1 className='congratulations-title'>{winnerName === "User" ? 'Congratulations!' : 'OOPS! Better Luck Next Time'}</h1>
        <p className='congratulations-message'>{winnerName} won the game!</p>
        <button className='play-again-button' onClick={Restart}>Play Again</button>
      </div>
      </div>    
    </div>
    
  );
};

export default Congratulations;

