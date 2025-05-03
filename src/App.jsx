import { Children, use, useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const TURNS ={
  X: '❌',
  O: '⭕'
}


const Square = ({children,isSelected, updateBoard, index} ) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index);
  }
 return (
  <div onClick={handleClick} key={index} className={className}>
     {children}
 </div>
 )
}

const winnerCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() { 

  //INICIALIZAR ESTADOS
const [board,setBoard] = useState(Array(9).fill(null));
const [turn, setTurn] = useState(TURNS.X);
const [winner, setWinner] = useState(null);


//COMRPOBAR SI HAY UN GANADOR
const checkWinner = (boardToCheck) => {
  for (const combination of winnerCombinations) {
    const [a,b,c] = combination;
    if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
      return boardToCheck[a];
    }
  }
  return null;
}

 //RESETEAR EL JUEGO
  const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
   } 
 

   //COMPROBAR SI EL JUEGO TERMINO
    const checkEndGame = (newBoard) => {
      return newBoard.every((square) => square !== null);
  } 

//FUNCION ACTUALIZAR EL TABLERO
const updateBoard = (index) => {
  if(board[index] || winner) return;
  
 const newBoard = [...board];
 newBoard[index] = turn;
 setBoard(newBoard);

 //Nuevo turno o actulizar para el siguiente jugador
  const  newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);

  

  const newWiner = checkWinner(newBoard);
  if(newWiner){
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f2a900', '#e85d04', '#d83333', '#0b3d91']

    });
    setWinner(newWiner);
}  else if(checkEndGame(newBoard)){
   setWinner(false);
}
  

}
  
return(   
  <main className='board'>
      <h1>Tic Tac toe</h1>
      <button onClick={resetGame}>Reiniciar el juego</button>
       <section className='game'>
             {
                board.map((square, index) => {
                  return (
                   <Square 
                   key={index}
                   index={index}
                   updateBoard={updateBoard}
                   >{square}</Square>
                  )
                })
             }
          
       </section>
       <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
       </section>
   
           {
                  winner !== null && (

                 <section className='winner'> 
                 <div className='text'>
                    <h2>{ winner === false? 'empate' :'gano' }</h2>

                    <header className='win'>
                      {winner && <Square>{winner}</Square>}
                    </header>

                    <footer>
                      <button onClick={resetGame}>Empezar de nuevo</button>
                    </footer>
                 </div> 
                  </section>
             ) 
           }
  
  </main>
  )
}
export default App;