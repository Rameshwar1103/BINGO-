import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewContext } from './context/Context';
import Playgorund from './components/Playgorund'; 
import Intro from './components/Intro';

const App = () => {
  const { isOwn } = useContext(NewContext);

  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/playground" element={<Playgorund />} />
        </Routes>
      </Router>

  );
};

export default App;
