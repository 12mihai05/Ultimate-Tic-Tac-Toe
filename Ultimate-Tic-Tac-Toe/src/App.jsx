import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Game from './Game.jsx';
import Score from './Score.jsx';
import Reset from './Reset.jsx';
import Rules from "./Rules.jsx"
import './App.css';
import titleImage from './assets/title.png';

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

  const xTurn = document.querySelector(`.x-turn`);
  const oTurn = document.querySelector(`.o-turn`);
  
  if (xTurn && oTurn) {
    xTurn.style.color = 'white';
    oTurn.style.color = 'hsl(0, 0%, 75%)';
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

  // start inactive so the initial modal blocks interaction
  const [isGameActive, setIsGameActive] = useState(false);

  const containerRef = useRef(null);

  // prepare portal target and modal element so overlay sits directly under #root
  const rootElement = typeof document !== 'undefined' ? document.getElementById('root') : null;

  // control modal visibility (initially open)
  const [modalOpen, setModalOpen] = useState(true);
  // true for the very first modal shown on app load; while true the modal cannot be closed
  const [initialModal, setInitialModal] = useState(true);
  
  const modalElement = (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.78)',
        zIndex: 9999,
        padding: 18
      }}
    >
      <div style={{
        background: 'var(--bg, #0b1020)',
        padding: 26,
        borderRadius: 14,
        minWidth: 320,
        maxWidth: 520,
        width: '92%',
        color: 'white',
        boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
      }}>
        <h2 style={{margin: 0, fontSize: 22, letterSpacing: '0.4px'}}>How would you like to play?</h2>
        <p style={{color: '#cfd8e3', marginTop: 10, marginBottom: 18, fontSize: 14, lineHeight: 1.5}}>
          Co‑op: Two people take turns on the same device.
          Single Player: play against a computer opponent. The large board contains nine smaller 3×3 boards — placing a mark in a small cell sends the next player to the corresponding small board. If that small board is already finished, the next player may choose any open cell.
        </p>

        <div style={{display: 'grid', gap: 10, gridTemplateColumns: '1fr', justifyItems: 'center'}}>
          <button onClick={() => startMode('coop')} style={{width: '100%', maxWidth: 420, height: 40, padding: '0 14px', borderRadius: 20, border: '3px solid #5ed0ff', cursor: 'pointer', background: 'hsl(219, 41%, 23%)', color: 'white', fontWeight: 800, fontSize: 15}}>Co‑op — Two players</button>
          <button onClick={() => startMode('single', 2)} style={{width: '100%', maxWidth: 420, height: 40, padding: '0 14px', borderRadius: 20, border: '3px solid #5ed0ff', cursor: 'pointer', background: 'hsl(219, 41%, 23%)', color: 'white', fontWeight: 800, fontSize: 15}}>Single Player — Easy</button>
          <button onClick={() => startMode('single', 3)} style={{width: '100%', maxWidth: 420, height: 40, padding: '0 14px', borderRadius: 20, border: '3px solid #5ed0ff', cursor: 'pointer', background: 'hsl(219, 41%, 23%)', color: 'white', fontWeight: 800, fontSize: 15}}>Single Player — Medium</button>
          <button onClick={() => startMode('single', 4)} style={{width: '100%', maxWidth: 420, height: 40, padding: '0 14px', borderRadius: 20, border: '3px solid #5ed0ff', cursor: 'pointer', background: 'hsl(219, 41%, 23%)', color: 'white', fontWeight: 800, fontSize: 15}}>Single Player — Hard</button>
        </div>

        {/* show Close only if not the initial modal shown at app load */}
        {!initialModal && (
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 14}}>
            <button onClick={() => { setModalOpen(false); setIsGameActive(true); }} style={{height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: 'transparent', color: '#cfd8e3', cursor: 'pointer'}}>Close</button>
          </div>
        )}

      </div>
    </div>
  );

  // New: mode and AI difficulty
  // mode: null = show menu, 'coop' = two players, 'single' = single player vs AI
  const [mode, setMode] = useState(null);
  const [aiDifficulty, setAiDifficulty] = useState(3); // default depth

  let resetGame = () => {
    setSmallGames(Array(9).fill(null))
    setTiles(() => Array.from({ length: 9 }, () => Array(9).fill(null)));

    setActiveTiles(() => Array.from({ length: 9 }, () => Array(9).fill(true)));

    setTimeout(resetAnimation, 0);

    document.getElementsByClassName("title")[0].textContent = `Ultimate-Tic-Tac-Toe`;

    setPlayerTurn(Player_X);

    setIsGameActive(true);
  }

  // open menu from layout: disable board while modal is open
  const openMenu = () => { setModalOpen(true); setIsGameActive(false); setInitialModal(false); }

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

      if (windowWidth <= 600) {
        const scale = Math.min((windowWidth * 0.7) / 468, 0.9);
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'top';
      } 
      else if (windowWidth >= 600 && windowWidth <= 1115) {
        const scale = Math.min((windowWidth * 0.37) / 468, 1);
        container.style.transform = `scale(${0.9})`;
        container.style.transformOrigin = 'top';
      }
      else{
        container.style.transform = 'scale(1)';
        container.style.width = '100%';
      }
    };
  
    window.addEventListener('resize', adjustScale);
    adjustScale();
  
    return () => window.removeEventListener('resize', adjustScale);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const startMode = (selectedMode, difficulty = 3) => {
    setMode(selectedMode);
    setAiDifficulty(difficulty);
    setPlayerTurn(Player_X);
    // reset board and scores when changing mode
    resetGame();
    setScoreX(0);
    setScoreO(0);
    setModalOpen(false);
    setIsGameActive(true);
    setInitialModal(false);
  }

  return (
    <div ref={containerRef} className='container'>
      <img src={titleImage} alt="title" className='title'/>

      {/* Simple menu overlay to choose mode - uses inline styles to avoid CSS changes */}
      {modalOpen && (rootElement ? createPortal(modalElement, rootElement) : modalElement)}

      <div className='layout'>
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
          mode={mode || 'coop'}
          aiDifficulty={aiDifficulty}
        />
        <div className='layout-2'>
          <Score scoreX={scoreX} scoreO={scoreO} />
          <Reset resetGame={resetGame}/>
          <div className='reset-btn' onClick={openMenu} style={{marginTop: 12}}>Menu</div>
        </div>
      </div>
      <Rules/>
    </div>
  );
}

export default App;
