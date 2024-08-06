function Tile({ value, onClick, playerTurn, isHovered, index, board, isGameActive}) {

  const isMobileDevice = () =>
    /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(navigator.userAgent || navigator.vendor || window.opera);

  // Arrow function to determine the board class
  const getBoardClass = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 768 && isMobileDevice()) {
      return isHovered[board][index] && isGameActive ? `board-hover` : 'no-pointer';
    }
    return null;
  };

  let hoverClass = null;
  let boardClass = getBoardClass();

  if (value == null && playerTurn != null) {
    hoverClass = isHovered[board][index] && isGameActive ? `${playerTurn.toLowerCase()}-hover` : 'no-pointer';
  }

  return (
    <div onClick={onClick} className={`tile ${hoverClass} ${boardClass}`}>{value}</div>
  );
}

export default Tile;