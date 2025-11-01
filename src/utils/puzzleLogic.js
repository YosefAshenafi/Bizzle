// Shuffle array using Fisher-Yates algorithm
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Generate puzzle tiles from image
export const generatePuzzleTiles = (gridSize) => {
  const totalTiles = gridSize * gridSize;
  const tiles = Array.from({ length: totalTiles - 1 }, (_, i) => ({
    id: i,
    position: i,
    correctPosition: i,
    isEmpty: false,
  }));
  
  // Add empty tile
  tiles.push({
    id: totalTiles - 1,
    position: totalTiles - 1,
    correctPosition: totalTiles - 1,
    isEmpty: true,
  });
  
  return shuffle(tiles);
};

// Check if puzzle is solved
export const isPuzzleSolved = (tiles) => {
  return tiles.every((tile) => tile.position === tile.correctPosition);
};

// Swap two tiles
export const swapTiles = (tiles, index1, index2) => {
  const newTiles = [...tiles];
  [newTiles[index1].position, newTiles[index2].position] = [
    newTiles[index2].position,
    newTiles[index1].position,
  ];
  return newTiles;
};

// Get adjacent tiles (for tile puzzle movement)
export const getAdjacentTiles = (position, gridSize) => {
  const row = Math.floor(position / gridSize);
  const col = position % gridSize;
  const adjacent = [];

  if (row > 0) adjacent.push(position - gridSize); // up
  if (row < gridSize - 1) adjacent.push(position + gridSize); // down
  if (col > 0) adjacent.push(position - 1); // left
  if (col < gridSize - 1) adjacent.push(position + 1); // right

  return adjacent;
};

// Minimum moves to solve puzzle (heuristic)
export const calculateMinimumMoves = (gridSize) => {
  return Math.ceil(gridSize * gridSize / 2);
};

// Check if move is valid (only allow sliding into empty space)
export const isValidMove = (fromIndex, toIndex, gridSize, tiles) => {
  const fromTile = tiles[fromIndex];
  const toTile = tiles[toIndex];
  
  // Can only move into empty space
  if (!toTile.isEmpty) return false;
  
  const adjacent = getAdjacentTiles(fromTile.position, gridSize);
  return adjacent.includes(toTile.position);
};
