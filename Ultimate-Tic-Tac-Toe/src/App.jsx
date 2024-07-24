import { useState, useRef, useEffect } from 'react';
import Game from './Game.jsx';
import Score from './Score.jsx';
import Reset from './Reset.jsx';
import './App.css';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const adjustScale = () => {
      const container = containerRef.current;
      if (!container) return;

      const windowWidth = window.innerWidth;
    const containerWidth = container.scrollWidth;

      // Calculate scale factor
      if (windowWidth < 768) {
      const scale = (windowWidth / containerWidth) * 0.99999;
      container.style.transform = `scale(${Math.min(scale, 1)})`; // Ensure the scale doesn't exceed 1
      container.style.transformOrigin = 'top left';
      container.style.width = `${containerWidth}px`; // Prevent overflow
      }else {
        // Reset to default if viewport width is 650px or more
        container.style.transform = 'scale(1)';
        container.style.width = '100%'; // Reset width to default
      }
    };

    window.addEventListener('resize', adjustScale);
    adjustScale(); // Initial scale adjustment

  }, []);

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  
  const updateScore = (winner) => {
    if (winner === 'X') {
      setScoreX((scoreX) => scoreX + 1);
    } else if (winner === 'O') {
      setScoreO((scoreO) => scoreO + 1);
    }
  };

  return (
      <div className='layout' ref={containerRef}>
        <Game updateScore={updateScore} />
        <div className='layout-2'>
          <Score scoreX={scoreX} scoreO={scoreO} />
          <Reset />
      </div>
    </div>
  );
}

export default App;
