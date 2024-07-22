import Tile from './Tile.jsx'

function Board({ tiles , onTileClick, playerTurn}){

    return(
        <div className='big-board'>
            <div className='board board-0'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 0)} value={tiles[0][0]} />
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 0)} value={tiles[1][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 0)} value={tiles[2][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 0)} value={tiles[3][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 0)} value={tiles[4][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 0)} value={tiles[5][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 0)} value={tiles[6][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 0)} value={tiles[7][0]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 0)} value={tiles[8][0]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-1'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 1)} value={tiles[0][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 1)} value={tiles[1][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 1)} value={tiles[2][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 1)} value={tiles[3][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 1)} value={tiles[4][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 1)} value={tiles[5][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 1)} value={tiles[6][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 1)} value={tiles[7][1]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 1)} value={tiles[8][1]}/>
                <div className="small-line small-vertical v-line-3"></div>                
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
          </div>

           <div className='board board-2'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 2)} value={tiles[0][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 2)} value={tiles[1][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 2)} value={tiles[2][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 2)} value={tiles[3][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 2)} value={tiles[4][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 2)} value={tiles[5][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 2)} value={tiles[6][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 2)} value={tiles[7][2]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 2)} value={tiles[8][2]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-3'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 3)} value={tiles[0][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 3)} value={tiles[1][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 3)} value={tiles[2][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 3)} value={tiles[3][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 3)} value={tiles[4][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 3)} value={tiles[5][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 3)} value={tiles[6][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 3)} value={tiles[7][3]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 3)} value={tiles[8][3]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-4'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 4)} value={tiles[0][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 4)} value={tiles[1][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 4)} value={tiles[2][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 4)} value={tiles[3][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 4)} value={tiles[4][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 4)} value={tiles[5][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 4)} value={tiles[6][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 4)} value={tiles[7][4]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 4)} value={tiles[8][4]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-5'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 5)} value={tiles[0][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 5)} value={tiles[1][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 5)} value={tiles[2][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 5)} value={tiles[3][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 5)} value={tiles[4][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 5)} value={tiles[5][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 5)} value={tiles[6][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 5)} value={tiles[7][5]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 5)} value={tiles[8][5]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-6'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 6)} value={tiles[0][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 6)} value={tiles[1][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 6)} value={tiles[2][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 6)} value={tiles[3][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 6)} value={tiles[4][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 6)} value={tiles[5][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 6)} value={tiles[6][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 6)} value={tiles[7][6]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 6)} value={tiles[8][6]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-7'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 7)} value={tiles[0][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 7)} value={tiles[1][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 7)} value={tiles[2][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 7)} value={tiles[3][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 7)} value={tiles[4][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 7)} value={tiles[5][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 7)} value={tiles[6][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 7)} value={tiles[7][7]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 7)} value={tiles[8][7]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className='board board-8'>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(0, 8)} value={tiles[0][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(1, 8)} value={tiles[1][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(2, 8)} value={tiles[2][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(3, 8)} value={tiles[3][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(4, 8)} value={tiles[4][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(5, 8)} value={tiles[5][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(6, 8)} value={tiles[6][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(7, 8)} value={tiles[7][8]}/>
                <Tile playerTurn={playerTurn} onClick={() => onTileClick(8, 8)} value={tiles[8][8]}/>
                <div className="small-line small-vertical v-line-3"></div>
                <div className="small-line small-vertical v-line-4"></div>
                <div className="small-line small-horizontal h-line-3"></div>
                <div className="small-line small-horizontal h-line-4"></div>
            </div>

            <div className="line vertical v-line-1"></div>
            <div className="line vertical v-line-2"></div>
            <div className="line horizontal h-line-1"></div>
            <div className="line horizontal h-line-2"></div>
        </div>

    )
}

export default Board