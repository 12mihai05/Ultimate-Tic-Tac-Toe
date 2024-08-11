import { useEffect, useState } from 'react';
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

function checkSmallGameWinner(tiles, smallGames, setSmallGames) {
  for (let board = 0; board <= 8; board++) {
    for (const combo of baseCombinations) {
      const tileValue1 = tiles[board][combo[0]];
      const tileValue2 = tiles[board][combo[1]];
      const tileValue3 = tiles[board][combo[2]];

      if (tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
        const boardElement = document.getElementsByClassName(`board-${board}`)[0];

        const newSmallGames = [...smallGames];
        newSmallGames[board] = tileValue1;
        setSmallGames(newSmallGames);

        if (boardElement) {
          const lineV3 = boardElement.querySelectorAll('.v-line-3');
          const lineV4 = boardElement.querySelectorAll('.v-line-4');

          const lineH3 = boardElement.querySelectorAll('.h-line-3');
          const lineH4 = boardElement.querySelectorAll('.h-line-4');

          const tile = document.querySelectorAll(`.board-${board} > div:not(.small-line)`)
          
          if(tileValue1 === Player_X){

            lineV3.forEach(line => {
              if (line) {
                line.classList.add('v-line-x-3');
                line.classList.remove('v-line-3');
              }
            });

            
            lineV4.forEach(line => {
              if (line) {
                line.classList.add('v-line-x-4');
                line.classList.remove('v-line-4');
              }
            });

            lineH3.forEach(line => {
              if (line) {
                line.classList.remove('h-line-3');
                line.classList.add('h-line-x-3');
              }
            });

            
            lineH4.forEach(line => {
              if (line) {
                line.classList.remove('h-line-4');
                line.classList.add('h-line-x-4');
              }
            });

            tile.forEach(tile => {
              if(tile){
                tile.innerHTML = '';
              }
            });
          }else if(tileValue1 === Player_O){

            lineV3.forEach(line => {
              if (line) {
                line.classList.add('v-line-o-3');
                line.classList.remove('v-line-3');
              }
            });

            
            lineV4.forEach(line => {
              if (line) {
                line.classList.add('v-line-o-4');
                line.classList.remove('v-line-4');
              }
            });

            lineH3.forEach(line => {
              if (line) {
                line.classList.remove('h-line-3');
                line.classList.add('h-line-o-3');
              }
            });

            
            lineH4.forEach(line => {
              if (line) {
                line.classList.remove('h-line-4');
                line.classList.add('h-line-o-4');
              }
            });

            tile.forEach(tile => {
              if(tile){
                tile.innerHTML = '';
              }
            });
          }
          
        } else {
          console.log(`Element with class name board-${board} not found.`);
        }
      }
    }
  }
}

function checkWinner(smallGames, updateScore, setIsGameActive){
    for (const combo of baseCombinations) {
    const smallGame1 = smallGames[combo[0]];
    const smallGame2 = smallGames[combo[1]];
    const smallGame3 = smallGames[combo[2]];

    if(smallGame1 != null && smallGame1 === smallGame2 && smallGame1 === smallGame3){
      document.getElementsByClassName("title")[0].textContent = `${smallGame1} Wins!`;
      updateScore(smallGame1);
      setIsGameActive(false);
      break;
    }
  }
}

function checkForDraw(smallGames, tiles,isDraw, setDraw){

  setDraw(true);

  for (let i = 0; i < 9; i++) {
    if (smallGames[i] === null && tiles[i].some(tile => tile === null)) {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    setDraw(true);
    document.getElementsByClassName("title")[0].textContent = `Draw!`;
  }
}



function Game({updateScore, tiles, setTiles, smallGames, setSmallGames, playerTurn, setPlayerTurn, isGameActive, setIsGameActive, activeTiles, setActiveTiles}) {

  const [isDraw, setDraw] = useState(false);

  const turnElement = document.querySelector(`.${playerTurn.toLowerCase()}-turn`);
  if (turnElement) {
    turnElement.style.color = 'white';
  }

  const handleTileClick = (board, index) => {
    if (tiles[board][index] !== null || !activeTiles[board][index] || !isGameActive) {
      return;
    }
  
    const newTiles = [...tiles];
    newTiles[board][index] = playerTurn;
    setTiles(newTiles);

    if (playerTurn === Player_X) {
      setPlayerTurn(Player_O);
      turnElement.style.color = 'hsl(0, 0%, 75%)';
    } else {
      setPlayerTurn(Player_X);
      turnElement.style.color = 'hsl(0, 0%, 75%)';

    }
  
    const newSmallGames = [...smallGames];
    for (const combo of baseCombinations) {
      const [a, b, c] = combo;
      if (
        newTiles[board][a] &&
        newTiles[board][a] === newTiles[board][b] &&
        newTiles[board][a] === newTiles[board][c]
      ) {
        newSmallGames[board] = newTiles[board][a];
        setSmallGames(newSmallGames);
        break;
      }
    }
  
    const newActiveTiles = Array.from({ length: 9 }, () => Array(9).fill(false));
    
    if (newSmallGames[index] !== null || (newSmallGames[board] !== null && board === index) || !newTiles[index].some(tile => tile === null) || newTiles[index].every(tile => tile !== null)) {
      for (let i = 0; i < 9; i++) {
        if (newSmallGames[i] === null && newTiles[i].some(tile => tile === null)) {
          for (let j = 0; j < 9; j++) {
            newActiveTiles[i][j] = true;
          }
        }
      }
    } else {
      for (let j = 0; j < 9; j++) {
        newActiveTiles[index][j] = true;
      }
    }
  
    setActiveTiles(newActiveTiles);
  };
  

    useEffect(() => {
      if(isGameActive){
      checkSmallGameWinner(tiles, smallGames, setSmallGames);
      checkForDraw(smallGames, tiles, isDraw, setDraw);
      checkWinner(smallGames, updateScore, setIsGameActive);
      }
    }, [tiles]);

  return (
    <>
    <div className='game'>
        <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} isHovered={activeTiles} isGameActive={isGameActive}/>
    </div>
    </>
  );
}

export default Game