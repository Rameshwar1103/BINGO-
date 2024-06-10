import React,{useState} from 'react';

import Navbar from './components/Navbar';
import Matrix from './components/Matrix';
import Comp_Matrix from './components/Comp_Matrix';
import Congrats from './components/Congrats';

const App = () => {
  const [matrix, setMatrix] = useState(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  const [matrix2, setMatrix2] = useState(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isOwn,setisOwn] = useState("NO");
  const [winnerName,setwinnerName] = useState("");
  const [turn,setTurn] = useState("user");

  console.log(isOwn);

  const restoreMatrix =()=>{
    setMatrix(Array.from({ length: 25 }, (_, i) => (i + 1).toString()));
  } 
  const handleIndexClick = (index) => {
    setClickedIndex(index);
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
  }
  return (
    
      <div>
        <Navbar />
        
        <div>
      {isOwn === "Yes" ? (
       <Congrats restoreMatrix={restoreMatrix} handleIndexClick={handleIndexClick} anounceWinner={anounceWinner} winnerName={winnerName}/>
      ) : (
        <div className='container my-4' style={{height:"80vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"space-evenly",backgroundColor:"gray"}}>
        
        <Matrix matrix={matrix} matrix2={matrix2} setMatrix={setMatrix} clickedIndex ={clickedIndex} onButtonClick={handleIndexClick}  anounceWinner={anounceWinner} setwinner={setwinner} turn={turn} setturn={setturn}/>
        <Comp_Matrix   matrix={matrix} matrix2={matrix2} setMatrix2={setMatrix2} clickedIndex={clickedIndex} handleIndexClick={handleIndexClick}  anounceWinner={anounceWinner} setwinner={setwinner} turn={turn} setturn={setturn}/>
        </div>
      )}
      
    </div>
      </div>
    
  );
};

export default App;
