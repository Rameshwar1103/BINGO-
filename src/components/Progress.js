import React, { useContext } from 'react'
import { NewContext } from '../context/Context'
import "./boxstyle.css";
function Progress(props) {
    const {count2,count} = useContext(NewContext);
  return (
    <div>
        { props.cnt === "player"?(
      <div className="box"  >
        <span className="letter" style={{color:count2 >= 1?"red":"white",fontSize:"48px"}}>B</span>
        <span className="letter" style={{color:count2 >= 2?"red":"white",fontSize:"48px"}}>I</span>
        <span className="letter" style={{color:count2 >= 3?"red":"white",fontSize:"48px"}}>N</span>
        <span className="letter" style={{color:count2 >= 4?"red":"white",fontSize:"48px"}}>G</span>
        <span className="letter" style={{color:count2 >= 5?"red":"white",fontSize:"48px"}}>O</span>
    </div>)
        :(
        <div className="box"  >
            <span className="letter" style={{color:count >= 1?"red":"white",fontSize:"48px"}}>B</span>
            <span className="letter" style={{color:count >= 2?"red":"white",fontSize:"48px"}}>I</span>
            <span className="letter" style={{color:count >= 3?"red":"white",fontSize:"48px"}}>N</span>
            <span className="letter" style={{color:count >= 4?"red":"white",fontSize:"48px"}}>G</span>
            <span className="letter" style={{color:count >= 5?"red":"white",fontSize:"48px"}}>O</span>
        </div>  
        )
        }
    </div>
  )
}

export default Progress
