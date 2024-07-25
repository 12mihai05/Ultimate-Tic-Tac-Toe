import { useState, useRef, useEffect } from 'react';
import Game from './Game.jsx';
import Score from './Score.jsx';
import Reset from './Reset.jsx';
import './App.css';

const Player_X = "X";

let resetAnimation = () => {
  for(let board = 0; board <= 8 ; board++) {
    const boardElement = document.getElementsByClassName(`board-${board}`)[0];

      const lineV3 = boardElement.querySelectorAll('.v-line-3, .v-line-x-3, .v-line-o-3');
      const lineV4 = boardElement.querySelectorAll('.v-line-4, .v-line-x-4, .v-line-o-4');
      const lineH3 = boardElement.querySelectorAll('.h-line-3, .h-line-x-3, .h-line-o-3');
      const lineH4 = boardElement.querySelectorAll('.h-line-4, .h-line-x-4, .h-line-o-4');

      lineV3.forEach(line => {
        if (line.classList.contains('v-line-x-3')) {
          line.classList.remove('v-line-x-3');
          line.classList.add('v-line-3');
        }
        if (line.classList.contains('v-line-o-3')) {
          line.classList.remove('v-line-o-3');
          line.classList.add('v-line-3');
        }
      });

      lineV4.forEach(line => {
        if (line.classList.contains('v-line-x-4')) {
          line.classList.remove('v-line-x-4');
          line.classList.add('v-line-4');
        }
        if (line.classList.contains('v-line-o-4')) {
          line.classList.remove('v-line-o-4');
          line.classList.add('v-line-4');
        }
      });

      lineH3.forEach(line => {
        if (line.classList.contains('h-line-x-3')) {
          line.classList.remove('h-line-x-3');
          line.classList.add('h-line-3');
        }
        if (line.classList.contains('h-line-o-3')) {
          line.classList.remove('h-line-o-3');
          line.classList.add('h-line-3');
        }
      });

      lineH4.forEach(line => {
        if (line.classList.contains('h-line-x-4')) {
          line.classList.remove('h-line-x-4');
          line.classList.add('h-line-4');
        }
        if (line.classList.contains('h-line-o-4')) {
          line.classList.remove('h-line-o-4');
          line.classList.add('h-line-4');
        }
      });
  }
};

function App() {

  const [tiles, setTiles] = useState(() => {
    return Array.from({ length: 9 }, () => Array(9).fill(null));
  });

  const [activeTiles, setActiveTiles] = useState(() => {
    return Array.from({ length: 9 }, () => Array(9).fill(true));
  });

  const [smallGames, setSmallGames] = useState(Array(9).fill(null));

  const [playerTurn, setPlayerTurn] = useState(Player_X);

  const [isGameActive, setIsGameActive] = useState(true);

  const containerRef = useRef(null);

  let resetGame = () => {
    setSmallGames(Array(9).fill(null))
    setTiles(() => Array.from({ length: 9 }, () => Array(9).fill(null)));

    setActiveTiles(() => Array.from({ length: 9 }, () => Array(9).fill(true)));

    setTimeout(resetAnimation, 0);

    document.getElementsByClassName("title")[0].textContent = `Ultimate-Tic-Tac-Toe`;

    setPlayerTurn(Player_X);

    setIsGameActive(true);
  }

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  
  const updateScore = (winner) => {
    if (winner === 'X') {
      setScoreX((scoreX) => scoreX + 1);
    } else if (winner === 'O') {
      setScoreO((scoreO) => scoreO + 1);
    }
  };
  

  useEffect(() => {
    const adjustScale = () => {
      const container = containerRef.current;
      if (!container) return;

      const windowWidth = window.innerWidth;
    const containerWidth = container.scrollWidth;

      if (windowWidth < 768) {
      const scale = (windowWidth / containerWidth) * 0.99999;
      container.style.transform = `scale(${Math.min(scale, 1)})`;
      container.style.transformOrigin = 'top left';
      container.style.width = `${containerWidth}px`;
      }else {
        container.style.transform = 'scale(1)';
        container.style.width = '100%';
      }
    };

    window.addEventListener('resize', adjustScale);
    adjustScale();

  }, []);

  return (
      <div className='layout' ref={containerRef}>
        <Game
          updateScore={updateScore}
          tiles={tiles}
          setTiles={setTiles}
          smallGames={smallGames}
          setSmallGames={setSmallGames}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
          isGameActive={isGameActive}
          setIsGameActive={setIsGameActive}
          activeTiles={activeTiles}
          setActiveTiles={setActiveTiles}
        />
        <div className='layout-2'>
          <Score scoreX={scoreX} scoreO={scoreO} />
          <Reset resetGame={resetGame}/>
      </div>
    </div>
  );
}

export default App;
