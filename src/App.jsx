import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './css/style.css'

function Box({id,handleClick,value}){
  return <button onClick={handleClick} key={id} className='box'>{value}</button>
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [isXTurn,setIsXTurn] = useState(true)
  const [info,setInfo] = useState(`Giliran ${isXTurn ? "X" : "O"}`)
  const [theWinner,setWinner] = useState(false)
  const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  function cekWinner(updateSquares){
    for(const combo of winner){
      const [a,b,c] = combo
      if(updateSquares[a] &&  updateSquares[a] === updateSquares[b] && updateSquares[a] === updateSquares[c]){
        setWinner(true)
        setInfo(`The Winner is ${isXTurn ? 'X' : 'O'} 🍾`)
      }
    }
  }
  function handleClick(index){
    
    if(!theWinner){
      if(squares[index] != null) return
      const updateSquares = squares.map((square,i) => {
        if(index == i){
          return isXTurn ? "X" : "O"
        }else{
          return square
        }
      })
      setSquares(updateSquares); 
      setHistory([...history, updateSquares]); 
      setInfo(`Giliran ${!isXTurn ? "X" : "O"} `)
      setIsXTurn(!isXTurn)
      cekWinner(updateSquares)
      if(!updateSquares.some(item => item === null)){
        setInfo("Draw!!")
      }
      
    }
    
  }

  function reset(){
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
    setInfo(`Giliran ${!isXTurn ? "X" : "O"} `)
    setWinner(false)
  }

  return (
    <>

      <h1>{info}</h1>
      <div className='buttonWrapper'>
        <button onClick={reset}>Reset</button>
      </div>
      <div className='box-wrapper'>
        {squares.map((square,index)=>(
          <Box key={index} handleClick={()=>handleClick(index)} id={index} value={square}/>
        ))}
      </div>
    </>
  )
}

export default App
