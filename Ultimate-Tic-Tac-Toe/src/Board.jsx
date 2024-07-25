import React from 'react';
import Tile from './Tile.jsx';
import './Lines.css';

function Board({ tiles, onTileClick, playerTurn, isHovered }) {
    // Helper function to render a row of tiles
    const renderTiles = (boardIndex) => (
        Array.from({ length: 9 }, (_, index) => (
            <Tile
                key={`tile-${index}-${boardIndex}`}
                playerTurn={playerTurn}
                onClick={() => onTileClick(index, boardIndex)}
                index={index}
                board={boardIndex}
                value={tiles[index][boardIndex]}
                isHovered={isHovered}
            />
        ))
    );

    return (
        <div className='big-board'>
            {Array.from({ length: 9 }, (_, boardIndex) => (
                <div key={`board-${boardIndex}`} className={`board board-${boardIndex}`}>
                    {renderTiles(boardIndex)}
                    <div className="small-line small-vertical v-line-3"></div>
                    <div className="small-line small-vertical v-line-4"></div>
                    <div className="small-line small-horizontal h-line-3"></div>
                    <div className="small-line small-horizontal h-line-4"></div>
                </div>
            ))}
            <div className="line vertical v-line-1"></div>
            <div className="line vertical v-line-2"></div>
            <div className="line horizontal h-line-1"></div>
            <div className="line horizontal h-line-2"></div>
        </div>
    );
}

export default Board;
