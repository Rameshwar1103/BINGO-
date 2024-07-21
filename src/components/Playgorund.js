import React,{useContext} from 'react'
import Navbar from './Navbar';
import Congrats from "./Congrats";
import Matrix from './Matrix';
import Comp_Matrix from "./Comp_Matrix";
import { NewContext } from '../context/Context';

function Playgorund() {
    const {
        isOwn
      } = useContext(NewContext);
  return (
    <div>
       <Navbar />
      <div>
        {isOwn === "Yes" ? (
          <Congrats />
        ) : (
          <div className='container my-4' style={{ height: "80vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "gray" }}>
            <Matrix  />
            <Comp_Matrix />
          </div>
        )}
      </div>
    </div>
  )
}

export default Playgorund
