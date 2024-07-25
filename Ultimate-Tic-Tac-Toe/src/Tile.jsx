function Tile({ value, onClick, playerTurn, isHovered, index, board}) {
  let hoverClass = null;
  if (value == null && playerTurn != null) {
    hoverClass = isHovered[index][board] ? `${playerTurn.toLowerCase()}-hover` : 'no-pointer';
  }
  console.log(isHovered)

  return (
    <div onClick={onClick} className={`tile ${hoverClass}`}>{value}</div>
  );
}

export default Tile;