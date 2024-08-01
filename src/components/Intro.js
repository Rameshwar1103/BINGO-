import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './intro.css';

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to /playground after 5 seconds
    const timer = setTimeout(() => {
      navigate('/GameModeselection');
    }, 2200);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div className="Container">
      <div className="loader">
        <div className="cell d-0"></div>
        <div className="cell d-1"></div>
        <div className="cell d-2"></div>
        <div className="cell d-1"></div>
        <div className="cell d-2"></div>
        <div className="cell d-2"></div>
        <div className="cell d-3"></div>
        <div className="cell d-3"></div>
        <div className="cell d-4"></div>
      </div>
      <div className='bingo'>
          BINGO
      </div>
    </div>
  );
}

export default Intro;
