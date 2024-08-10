import "./Rules.css"

function Rules(){

    return(
        <div className="rules">
            <details>
            <summary>Ultimate Tic Tac Toe: Rules</summary>
            <div className="content">
            <ol>
                <li>
                    <h3>Game Structure:</h3>
                    <ul>
                        <li>
                        The game consists of 9 smaller Tic Tac Toe 
                        boards arranged in a 3x3 grid, forming one 
                        large Ultimate Board.
                        </li>
                    </ul>
                </li>
                
                <li>
                    <h3>Move Determination:</h3>
                    <ul>
                        <li>
                        The cell a player chooses within a smaller board 
                        dictates the smaller board the next player must 
                        play in. For example, if a player places their 
                        mark in the bottom-left cell of a smaller board, 
                        the next player must play in the bottom-left 
                        smaller board.
                        </li>
                    </ul>
                </li>

                <li>
                    <h3>Winning a Smaller Board:</h3>
                    <ul>
                        <li>
                        A player wins a smaller board by getting three of 
                        their marks in a row (horizontally, vertically, 
                        or diagonally) within that board.
                        </li>
                    </ul>
                </li>

                <li>
                    <h3>Winning the Ultimate Board:</h3>
                    <ul>
                        <li>
                        The game is won by the first player to win three 
                        smaller boards in a row (horizontally, vertically, 
                        or diagonally) on the Ultimate Board.
                        </li>
                    </ul>
                </li>

                <li>
                    <h3>Forced Moves:</h3>
                    <ul>
                        <li>
                        If a player is sent to a smaller board that has 
                        already been won or is full, they can choose any 
                        available cell on any of the remaining smaller 
                        boards.
                        </li>
                    </ul>
                </li>

                <li>
                    <h3>Draws:</h3>
                    <ul>
                        <li>
                        If all 81 cells are filled and neither player has 
                        won the Ultimate Board, the game ends in a draw.
                        </li>
                    </ul>
                </li>
            </ol>
            </div>
            </details>
        </div>
    );
}

export default Rules

