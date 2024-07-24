import './Score.css'

function Score({scoreO, scoreX}){

    return(
        <>
        <div className="score-board">
            <div className="players">
                <h3>Player_X</h3>
                <h3>Player_O</h3>
            </div>
            
            <div className="score">
                <h4>Score: {scoreX}</h4>
                <h4>Score: {scoreO}</h4>
            </div>
            <div className="line-1"></div>
            <div className="line-2"></div>
        </div>
        </>
    );
}

export default Score