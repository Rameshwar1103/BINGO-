import React,{useContext} from 'react'
import Navbar from './Navbar';
import Congrats from "./Congrats";
import { NewContext } from '../context/Context';
import PlayerMatrix from './PlayerMatrix';
import PlayerTwoMatrix from './PlayerTwoMatrix';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true // Ensure credentials are sent with the request
});
function Playgorund2() {
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
            <PlayerMatrix />
            <PlayerTwoMatrix />
          </div>
        )}
      </div>
    </div>
  )
}

export default Playgorund2
