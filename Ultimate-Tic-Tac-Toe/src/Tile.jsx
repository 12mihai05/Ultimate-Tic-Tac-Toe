function Tile({ value, onClick, playerTurn, isHovered, index, board, isGameActive}) {

  const isMobileDevice = () =>
    /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(navigator.userAgent || navigator.vendor || window.opera);


  let hoverClass = null;
  let boardClass = null;

  if(isMobileDevice()){
    boardClass = isHovered[board][index] && isGameActive ? `board-hover` : 'no-pointer';
  }

  if (value == null && playerTurn != null) {
    hoverClass = isHovered[board][index] && isGameActive ? `${playerTurn.toLowerCase()}-hover` : 'no-pointer';
  }

  return (
    <div onClick={onClick} className={`tile ${hoverClass} ${boardClass}`}>{value}</div>
  );
}

export default Tile;