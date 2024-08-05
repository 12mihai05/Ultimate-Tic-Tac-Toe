function Tile({ value, onClick, playerTurn, isHovered, index, board, isGameActive}) {
  let hoverClass = null;
  let boardClass = null;
  if (value == null && playerTurn != null) {
    hoverClass = isHovered[board][index] && isGameActive ? `${playerTurn.toLowerCase()}-hover` : 'no-pointer';
    const windowWidth = window.innerWidth;
    if(windowWidth <= 768)
    boardClass = isHovered[board][index] && isGameActive ? `board-hover` : 'no-pointer';
  }

  return (
    <div onClick={onClick} className={`tile ${hoverClass} ${boardClass}`}>{value}</div>
  );
}

export default Tile;