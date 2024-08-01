import React, { useContext } from 'react';
import './Congratulations.css'; // Import the CSS file for styling
import './VideoBackgroundBox.css';
import { NewContext } from '../context/Context';
const Congratulations = ( ) => {

    const {restoreMatrix, handleIndexClick,handleIndexClick2,announceWinner,winnerName, } = useContext(NewContext);
    // const backgroundImageUrl = winnerName === "User" ? 'url("src/components/happy.jpg")' 
    //  : 'url("./betterluck2.jpg")';
    //  const style = {
    //   height: "200px",
    //   width: "200px",
    //   backgroundImage: backgroundImageUrl,
    //   backgroundSize: 'cover',  // Corrected syntax
    //   backgroundPosition: 'center',  // Corrected syntax
    //   backgroundRepeat: 'no-repeat',  // Corrected syntax
    //   border:"2px solid white"
    // };

const Restart =()=>{
    restoreMatrix();
    handleIndexClick(null);
    handleIndexClick2(null);
    announceWinner("NO");
}
  return (
    <div className="Container">
     { (winnerName==="User")?
      (<div className='container my-4 congratulations-container'>
      <div className="image">
      </div>
      <div className='congratulations-content'>
        <h1 className='congratulations-title'>Congratulations!</h1>
        <p className='congratulations-message'>You won the game!</p>
        <button className='play-again-button' onClick={Restart}>Play Again</button>
      </div>
      </div> ):
     (
      <div className='container my-4 congratulations-container'>
      <div className="image1">
      </div>
      <div className='congratulations-content'>
        <h1 className='congratulations-title'> OOPS! Better Luck Next Time</h1>
        <p className='congratulations-message'>Computer won the game!</p>
        <button className='play-again-button' onClick={Restart}>Play Again</button>
      </div>
      </div>
     ) 
    }  
    </div>
    
  );
};

export default Congratulations;

