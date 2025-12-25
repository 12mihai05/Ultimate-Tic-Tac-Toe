const baseCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function cloneTiles(tiles){
  return tiles.map(b => b.slice());
}

function checkSmallWinnerForBoard(boardTiles){
  for(const combo of baseCombinations){
    const a = boardTiles[combo[0]];
    const b = boardTiles[combo[1]];
    const c = boardTiles[combo[2]];
    if(a != null && a === b && a === c) return a;
  }
  return null;
}

function checkBigWinner(smallGames){
  for(const combo of baseCombinations){
    const a = smallGames[combo[0]];
    const b = smallGames[combo[1]];
    const c = smallGames[combo[2]];
    if(a != null && a === b && a === c) return a;
  }
  return null;
}

function generateLegalMoves(tiles, activeTiles){
  const moves = [];
  for(let b = 0; b < 9; b++){
    for(let i = 0; i < 9; i++){
      if(activeTiles[b] && activeTiles[b][i] && tiles[b][i] === null){
        moves.push({board: b, index: i});
      }
    }
  }
  return moves;
}

function applyMove(tiles, smallGames, activeTiles, move, player){
  const newTiles = cloneTiles(tiles);
  newTiles[move.board][move.index] = player;

  const newSmallGames = smallGames.slice();
  const winner = checkSmallWinnerForBoard(newTiles[move.board]);
  if(winner) newSmallGames[move.board] = winner;
  // also if board gets fully filled with no winner, leave as null (drawn small board)

  const newActiveTiles = Array.from({ length: 9 }, () => Array(9).fill(false));

  // Determine next active area following the same rules as the game
  if (newSmallGames[move.index] != null || newTiles[move.index].every(t => t !== null)) {
    for(let i = 0; i < 9; i++){
      if(newSmallGames[i] === null && newTiles[i].some(t => t === null)){
        for(let j = 0; j < 9; j++) newActiveTiles[i][j] = true;
      }
    }
  } else {
    for(let j = 0; j < 9; j++) newActiveTiles[move.index][j] = true;
  }

  return { newTiles, newSmallGames, newActiveTiles };
}

function evaluate(tiles, smallGames, aiPlayer, humanPlayer){
  // Terminal big win
  const bigWinner = checkBigWinner(smallGames);
  if(bigWinner === aiPlayer) return 1000000;
  if(bigWinner === humanPlayer) return -1000000;

  let score = 0;

  // Score small games (ownership matters)
  for(let b = 0; b < 9; b++){
    if(smallGames[b] === aiPlayer) score += 500;
    else if(smallGames[b] === humanPlayer) score -= 500;
    else {
      // evaluate potential in unfinished small board
      for(const combo of baseCombinations){
        let aiCount = 0, huCount = 0;
        for(const idx of combo){
          if(tiles[b][idx] === aiPlayer) aiCount++;
          else if(tiles[b][idx] === humanPlayer) huCount++;
        }
        if(aiCount > 0 && huCount === 0){
          if(aiCount === 2) score += 40;
          else score += 10;
        }
        if(huCount > 0 && aiCount === 0){
          if(huCount === 2) score -= 40;
          else score -= 10;
        }
      }
      // center/corner preference
      if(tiles[b][4] === aiPlayer) score += 6;
      if(tiles[b][4] === humanPlayer) score -= 6;
      [0,2,6,8].forEach(c => { if(tiles[b][c] === aiPlayer) score += 3; if(tiles[b][c] === humanPlayer) score -= 3; });
    }
  }

  // Slight bonus for potential big-board lines based on smallGames
  for(const combo of baseCombinations){
    let aiCount = 0, huCount = 0;
    for(const idx of combo){
      if(smallGames[idx] === aiPlayer) aiCount++;
      else if(smallGames[idx] === humanPlayer) huCount++;
    }
    if(aiCount > 0 && huCount === 0) score += aiCount * 80;
    if(huCount > 0 && aiCount === 0) score -= huCount * 80;
  }

  return score;
}

function minimax(tiles, smallGames, activeTiles, depth, alpha, beta, maximizingPlayer, currentPlayer, aiPlayer, humanPlayer){
  const bigWinner = checkBigWinner(smallGames);
  if(depth === 0 || bigWinner != null){
    return { score: evaluate(tiles, smallGames, aiPlayer, humanPlayer) };
  }

  const moves = generateLegalMoves(tiles, activeTiles);
  if(moves.length === 0) return { score: evaluate(tiles, smallGames, aiPlayer, humanPlayer) };

  let bestMove = null;

  if(maximizingPlayer){
    let maxEval = -Infinity;
    for(const move of moves){
      const { newTiles, newSmallGames, newActiveTiles } = applyMove(tiles, smallGames, activeTiles, move, currentPlayer);
      const res = minimax(newTiles, newSmallGames, newActiveTiles, depth-1, alpha, beta, false, (currentPlayer === 'X' ? 'O' : 'X'), aiPlayer, humanPlayer);
      if(res.score > maxEval){
        maxEval = res.score; bestMove = move;
      }
      alpha = Math.max(alpha, res.score);
      if(beta <= alpha) break;
    }
    return { score: maxEval, move: bestMove };
  } else {
    let minEval = Infinity;
    for(const move of moves){
      const { newTiles, newSmallGames, newActiveTiles } = applyMove(tiles, smallGames, activeTiles, move, currentPlayer);
      const res = minimax(newTiles, newSmallGames, newActiveTiles, depth-1, alpha, beta, true, (currentPlayer === 'X' ? 'O' : 'X'), aiPlayer, humanPlayer);
      if(res.score < minEval){
        minEval = res.score; bestMove = move;
      }
      beta = Math.min(beta, res.score);
      if(beta <= alpha) break;
    }
    return { score: minEval, move: bestMove };
  }
}

export async function getBestMove(tiles, smallGames, activeTiles, aiPlayer='O', humanPlayer='X', maxDepth=3){
  // Quick heuristics: try to find immediate winning move or block opponent's immediate win
  const legal = generateLegalMoves(tiles, activeTiles);
  // Immediate winning check
  for(const m of legal){
    const { newTiles, newSmallGames } = applyMove(tiles, smallGames, activeTiles, m, aiPlayer);
    if(checkBigWinner(newSmallGames) === aiPlayer) return m;
    if(newSmallGames[m.board] === aiPlayer) return m; // win small board
  }
  // Block opponent immediate win
  for(const m of legal){
    const { newTiles, newSmallGames } = applyMove(tiles, smallGames, activeTiles, m, humanPlayer);
    if(checkBigWinner(newSmallGames) === humanPlayer) return m; // block
    if(newSmallGames[m.board] === humanPlayer) return m; // block small
  }

  // If depth 1 -> greedy evaluate
  if(maxDepth <= 1){
    let best = null, bestScore = -Infinity;
    for(const m of legal){
      const { newTiles, newSmallGames, newActiveTiles } = applyMove(tiles, smallGames, activeTiles, m, aiPlayer);
      const s = evaluate(newTiles, newSmallGames, aiPlayer, humanPlayer);
      if(s > bestScore){ bestScore = s; best = m; }
    }
    return best || legal[0];
  }

  // Run minimax
  const result = minimax(tiles, smallGames, activeTiles, maxDepth, -Infinity, Infinity, true, aiPlayer, aiPlayer, humanPlayer);
  return result.move || legal[Math.floor(Math.random() * legal.length)];
}
