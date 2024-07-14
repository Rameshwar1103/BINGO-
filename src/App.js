import React,{useState} from 'react';

import Navbar from './components/Navbar';
import Matrix from './components/Matrix';
import Comp_Matrix from './components/Comp_Matrix';
import Congrats from './components/Congrats';

const App = () => {
  const [matrix, setMatrix] = useState(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  const [matrix2, setMatrix2] = useState(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedIndex2,setClickedIndex2] = useState(null);
  const [isOwn,setisOwn] = useState("NO");
  const [winnerName,setwinnerName] = useState("");
  const [turn,setTurn] = useState("user");


  const restoreMatrix =()=>{
    setMatrix(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  } 
  const handleIndexClick = (index) => {
    setClickedIndex(index);
    // Additional logic if needed
  };
  
  const handleIndexClick2 = (index) => {
    setClickedIndex2(index);
    console.log("Clicked index",clickedIndex2);
    // Additional logic if needed
  };

  const anounceWinner =(text) =>{
    setisOwn(text);
    
  }
  const setwinner = (Name)=>{
    setwinnerName(Name);
  }

  const setturn = (text)=>{
    setTurn(text);
    console.log("turn is",turn);
  }
  return (
    
      <div>
        <Navbar />
        
        <div>
      {isOwn === "Yes" ? (
       <Congrats restoreMatrix={restoreMatrix} handleIndexClick={handleIndexClick} anounceWinner={anounceWinner} winnerName={winnerName}/>
      ) : (
        <div className='container my-4' style={{height:"80vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"gray"}}>
        
        <Matrix matrix={matrix} matrix2={matrix2} setMatrix={setMatrix} clickedIndex ={clickedIndex} onButtonClick={handleIndexClick} clickedIndex2={clickedIndex2} handleIndexClick2={handleIndexClick2} anounceWinner={anounceWinner} setwinner={setwinner} turn={turn} setturn={setturn}/>
        <Comp_Matrix   matrix={matrix} matrix2={matrix2} setMatrix2={setMatrix2} clickedIndex={clickedIndex} handleIndexClick={handleIndexClick} clickedIndex2={clickedIndex2} handleIndexClick2={handleIndexClick2} anounceWinner={anounceWinner} setwinner={setwinner} turn={turn} setturn={setturn}/>
        </div>
      )}
      
    </div>
      </div>
    
  );
};

export default App;
