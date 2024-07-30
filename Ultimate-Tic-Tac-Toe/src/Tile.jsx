function Tile({ value, onClick, playerTurn, isHovered, index, board, isGameActive}) {
  let hoverClass = null;
  if (value == null && playerTurn != null) {
    hoverClass = isHovered[board][index] && isGameActive ? `${playerTurn.toLowerCase()}-hover` : 'no-pointer';
  }

  return (
    <div onClick={onClick} className={`tile ${hoverClass}`}>{value}</div>
  );
}

export default Tile;