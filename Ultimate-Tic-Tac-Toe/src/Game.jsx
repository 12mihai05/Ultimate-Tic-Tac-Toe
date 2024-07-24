import { useState, useEffect } from 'react';
import Board from './Board'

const Player_X = "X";
const Player_O = "O";

// export const [score_X, setScore_X] = useState(-2);
// export const [score_O,setScore_O] = useState(0);

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


function checkWinner(tiles, smallGames, setSmallGames) {
  // Loop through each board
  for (let board = 0; board <= 8; board++) {
    for (const combo of baseCombinations) {
      const tileValue1 = tiles[combo[0]][board];
      const tileValue2 = tiles[combo[1]][board];
      const tileValue3 = tiles[combo[2]][board];

      if (tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
        // document.getElementsByClassName("title")[0].textContent = `${tileValue1} Wins!`;
        const boardElement = document.getElementsByClassName(`board-${board}`)[0];

        const newSmallGames = [...smallGames];
        newSmallGames[board] = tileValue1;
        setSmallGames(newSmallGames);

        // console.log(smallGames);
        // console.log(smallGame1 + " " + smallGame2 + " " + smallGame3)

        //console.log(`board-${board}`)

        if (boardElement) {
          // Now you can manipulate the style of the board element
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

function checkSmallGameWinner(smallGames, {updateScore}){
    for (const combo of baseCombinations) {
    const smallGame1 = smallGames[combo[0]];
    const smallGame2 = smallGames[combo[1]];
    const smallGame3 = smallGames[combo[2]];

    console.log(smallGame1 + " " + smallGame2 + " " + smallGame3)

    if(smallGame1 != null && smallGame1 === smallGame2 && smallGame1 === smallGame3){
      document.getElementsByClassName("title")[0].textContent = `${smallGame1} Wins!`;
      updateScore(smallGame1);
    }
  }
  //console.log( Score_X + " " + Score_O)
}



function Game({updateScore}) {
  
  const [tiles, setTiles] = useState(() => {
    // Create a 9x9 matrix
    return Array.from({ length: 9 }, () => Array(9).fill(null));
  });

  const [smallGames, setSmallGames] = useState(Array(9).fill(null));

  //console.log(tiles)
  const [playerTurn, setPlayerTurn] = useState(Player_X);



  const handleTileClick = (index, board) => {
    //console.log(index + " " + board);

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
    checkWinner(tiles, smallGames, setSmallGames);
  }, [tiles])

  useEffect(() => {
    checkSmallGameWinner(smallGames, {updateScore});
  }, [smallGames]);


  return (
    <>
    <div className='game'>
        <h1 className='title'>Ultimate-Tic-Tac-Toe</h1>
        <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick}/>
    </div>
    </>
  );
}

export default Game