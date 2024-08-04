import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewContext } from './context/Context';
import Playgorund from './components/Playgorund'; 
import Intro from './components/Intro';
import Playgorund2 from './components/Playground2';
import io from 'socket.io-client';
import GameModeSelection from './components/GameModeSelection';
import Login from './components/Login';

const socket = io('http://localhost:3001', {
  withCredentials: true // Ensure credentials are sent with the request
});
 
const App = () => {
  const { isOwn } = useContext(NewContext);

  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path='/Login' element={<Login />}/>
          <Route exact path='/GameModeselection' element={<GameModeSelection />} />
          <Route exact path="/playground" element={<Playgorund />} />
          <Route exact path="/playground2" element={<Playgorund2 />}/>
        </Routes>
      </Router>

  );
};

export default App;
