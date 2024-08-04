import React, { createContext, useState } from 'react';

const NewContext = createContext();

function ContextProvider({ children }) {
  const [isOwn, setIsOwn] = useState("NO");
  const [matrix, setMatrix] = useState(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  const [matrix2, setMatrix2] = useState(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedIndex2, setClickedIndex2] = useState(null);
  const [winnerName, setWinnerName] = useState("");
  const [turn, setTurn] = useState("user");
  const [buttonColors2, setButtonColors2] = useState(new Array(25).fill('red'));
  const [count, setCount] = useState(0);
  const [showRandom,setshowRandom] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [finalized, setFinalized] = useState(false);
  const [count2, setCount2] = useState(0);
  const [buttonColors, setButtonColors] = useState(new Array(25).fill('#32CD32'));
  const [isDisabled, setIsDisabled] = useState(false); 
  const [Player1,setPlayer1] = useState("");
  const [Player2,setPlayer2] = useState("");
  const [userList, setUserList] = useState([]);

  const restoreMatrix = () => {
    setMatrix(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  };

  const handleIndexClick = (index) => {
    setClickedIndex(index);
    //setClickedIndex2(index);
  };

  const handleIndexClick2 = (index) => {
    setClickedIndex2(index);
  };

  const announceWinner = (text) => {
    setIsOwn(text);
    setButtonColors(new Array(25).fill('#32CD32'));
    setButtonColors2(new Array(25).fill('red'));
  };

  const setWinner = (name) => {
    setWinnerName(name);
  };

  const setTurnState = (text) => {
    setTurn(text);
    console.log("turn is", turn);
  };

  return (
    <NewContext.Provider value={{
      isOwn, setIsOwn,
      matrix, setMatrix,
      matrix2, setMatrix2,
      clickedIndex, setClickedIndex,
      clickedIndex2, setClickedIndex2,
      winnerName, setWinnerName,
      turn, setTurn,
      restoreMatrix,
      handleIndexClick,
      handleIndexClick2,
      announceWinner,
      setWinner,
      setTurnState,
      buttonColors, setButtonColors,
      count, setCount,
      showRandom,setshowRandom,
      selectedButton, setSelectedButton,
      finalized, setFinalized,
      count2, setCount2,
      buttonColors2, setButtonColors2,
      isDisabled, setIsDisabled,
      Player1,setPlayer1,
      Player2,setPlayer2,
      userList, setUserList
    }}>
      {children}
    </NewContext.Provider>
  );
}

export { NewContext, ContextProvider };
