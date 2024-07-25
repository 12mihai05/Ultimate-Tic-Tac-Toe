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


function checkWinner(tiles, smallGames, setSmallGames) {
  for (let board = 0; board <= 8; board++) {
    for (const combo of baseCombinations) {
      const tileValue1 = tiles[combo[0]][board];
      const tileValue2 = tiles[combo[1]][board];
      const tileValue3 = tiles[combo[2]][board];

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

function checkSmallGameWinner(smallGames, updateScore, setIsGameActive){
    for (const combo of baseCombinations) {
    const smallGame1 = smallGames[combo[0]];
    const smallGame2 = smallGames[combo[1]];
    const smallGame3 = smallGames[combo[2]];

    if(smallGame1 != null && smallGame1 === smallGame2 && smallGame1 === smallGame3){
      document.getElementsByClassName("title")[0].textContent = `${smallGame1} Wins!`;
      updateScore(smallGame1);
      setIsGameActive(false);
    }
  }
}



function Game({updateScore, tiles, setTiles, smallGames, setSmallGames, playerTurn, setPlayerTurn, isGameActive, setIsGameActive, activeTiles, setActiveTiles}) {

  const handleTileClick = (index, board) => {

    if(tiles[index][board] !== null || !activeTiles[index][board] || !isGameActive){
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

    const newActiveTiles = Array.from({ length: 9 }, () => Array(9).fill(false));

    //!!!
    //cam asa cred ca ar trebui sa arate for-ul ish
    //in fiecare board in care este un castigator (smallGames[i] != null)
    //tiles-urile trebuie sa fie false, in rest totul sa fie true

    // for(let i = 0; i <= 8; i++){
    //     if(smallGames[i] != null){
    //      for(let j = 0; j <= 8; j++){
    //         newActiveTiles[j][i] = false;
    //      }
    //       if(index =! i){
    //       newActiveTiles[i][index] = true;
    //       }
    //     }else{
    //       newActiveTiles[i][index] = true;
    //   }
    // }

    for(let i = 0; i <= 8; i++){
      newActiveTiles[i][index] = true;
    }
    setActiveTiles(newActiveTiles);
  }

  useEffect(() => {
    checkWinner(tiles, smallGames, setSmallGames);
  }, [tiles])

  useEffect(() => {
    checkSmallGameWinner(smallGames, updateScore, setIsGameActive);
  }, [smallGames]);

  return (
    <>
    <div className='game'>
        <h1 className='title'>Ultimate-Tic-Tac-Toe</h1>
        <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} isHovered={activeTiles}/>
    </div>
    </>
  );
}

export default Game