import React from "react";

function Reset({resetGame}){

    return(
        <div className="reset-btn" onClick={resetGame}>
            Reset Game
        </div>
    );
}

export default Reset