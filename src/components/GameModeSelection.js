import React from 'react';
import './GameModeSelection.css';
import { useNavigate } from 'react-router-dom';

const GameModeSelection = () => {
  const navigate = useNavigate();
  const handleonClick1 =()=>{
    navigate('/playground');
  }

  const handleonClick2 =()=>{
    navigate('/Login');
  }
  return (
    <div className="container">
      <div className="button-container">
        <div className="button-item">
          <button className="mode-button" onClick={handleonClick1}>
            Single Player
            <p className='description'>Play solo against the computer.</p>
         </button>
        </div>
        <div className="button-item">
          <button className="mode-button" onClick={handleonClick2}>
            Multiplayer
          <p className='description'>Play with friends online or locally.</p>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default GameModeSelection;
