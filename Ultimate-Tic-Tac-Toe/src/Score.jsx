import './Score.css';
import { useState } from 'react';

function Score({ scoreO, scoreX }) {
    const [playerX, setPlayerX] = useState("Player_X");
    const [playerO, setPlayerO] = useState("Player_O");

    const handlePlayerXChange = (e) => {
        setPlayerX(e.target.value);
    };

    const handlePlayerOChange = (e) => {
        setPlayerO(e.target.value);
    };

    return (
        <div className="score-board">
            <div className="players">
                <input
                    className='x-turn'
                    type="text"
                    value={playerX}
                    onChange={handlePlayerXChange}
                    maxLength="13"
                />
                <input
                    className='o-turn'
                    type="text"
                    value={playerO}
                    onChange={handlePlayerOChange}
                    maxLength="13"
                />
            </div>

            <div className="score">
                <h4>Score: {scoreX}</h4>
                <h4>Score: {scoreO}</h4>
            </div>
            <div className="line-1"></div>
            <div className="line-2"></div>
        </div>
    );
}

export default Score;
