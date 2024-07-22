import { useState, useEffect } from 'react';
import Board from './Board'

const Player_X = "X";
const Player_O = "O";

const baseCombinations = [
  // Rows
  [0,1,2], [3,4,5], [6,7,8],
  
  // Columns
  [0,3,6], [1,4,7], [2,5,8],
  
  // Diagonals
  [0,4,8], [2,4,6]
];

const winningCombinations = [];

for (let board = 0; board <= 8; board++) {
  baseCombinations.forEach(cell => {
    winningCombinations.push({ cell, board });
  });
}

//console.log(winningCombinations)


function checkWinner(tiles) {
  // Loop through each board
  for (let board = 0; board <= 8; board++) {
    for (const combo of baseCombinations) {
      const tileValue1 = tiles[combo[0]][board];
      const tileValue2 = tiles[combo[1]][board];
      const tileValue3 = tiles[combo[2]][board];

      if (tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
        document.getElementsByClassName("title")[0].textContent = `${tileValue1} Wins!`;
        const boardElement = document.getElementsByClassName(`board-${board}`)[0];

        //console.log(`board-${board}`)

        if (boardElement) {
          // Now you can manipulate the style of the board element
          boardElement.style.backgroundColor = "hsl(204, 68%, 65%)"; // Example style change
        } else {
          console.log(`Element with class name board-${board} not found.`);
        }
      }
    }
  }
}



function Game() {

  
  const [tiles, setTiles] = useState(() => {
    // Create a 9x9 matrix
    return Array.from({ length: 9 }, () => Array(9).fill(null));
  });

  //console.log(tiles)
  const [playerTurn, setPlayerTurn] = useState(Player_X);

  const handleTileClick = (index, board) => {
    console.log(index + " " + board);


    if(tiles[index][board] !== null){
      return;
    }

    const newTiles = [...tiles];
    newTiles[index][board] = playerTurn;
    setTiles(newTiles)

    if(playerTurn === Player_X){
      setPlayerTurn(Player_O);
    }else{
      setPlayerTurn(Player_X);
    }

    

  }

  useEffect(() => {
    checkWinner(tiles);
  }, [tiles])

  return (
    <div className='game'>
        <h1 className='title'>Ultimate-Tic-Tac-Toe</h1>
        <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick}/>
    </div>
  );
}

export default Game
