export const SUDOKU_FOODS = [
  { symbol: "🍕", label: "Pizza" },
  { symbol: "🍔", label: "Burger" },
  { symbol: "🍟", label: "Pommes" },
  { symbol: "🌭", label: "Hotdog" },
  { symbol: "🍩", label: "Donut" },
  { symbol: "🍰", label: "Kuchen" },
  { symbol: "🍦", label: "Eis" },
  { symbol: "🍫", label: "Schokolade" },
  { symbol: "🥤", label: "Limo" },
];

export const SUDOKU_LEVELS = {
  6: {
    size: 6,
    blockRows: 2,
    blockColumns: 3,
    label: "Kleiner Nachmittagssnack",
    puzzles: [
      "123.5./....2./..4.6./56..34/3.5..2/6.2.45",
      "123.5./....../.34561/5...34/....1./.1234.",
      "12..../4..1.3/.34.6./5.1..4/...6../6.2.45",
      "....56/4.6.../2..5.1/561.3./345.../...3..",
    ],
  },
  9: {
    size: 9,
    blockRows: 3,
    blockColumns: 3,
    label: "Gigantisches Festmahl",
    puzzles: [
      "1.3....../....8..../......456/........./.....123./891.34.67/345.7891./67.9..345/9.23456.8",
      "12...678./.56789.2./7...2.45./.3.56...1/5678...../..1..4..7/.45...9.2/6...1..../......6.8",
      "123.....9/.5....1../7.9.2..../........1/56......./.9.23456./.45...9../67.912.4./9.2.45..8",
      ".....6..9/.5.78..../7..12...6/..4.6.89./....9..3./.9.2.4567/3..678.1./6...1..../..2..5...",
    ],
  },
};

function shuffledValues(length, random) {
  const values = Array.from({ length }, (_, index) => index);
  for (let index = values.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [values[index], values[target]] = [values[target], values[index]];
  }
  return values;
}

export function createSolution(size, blockRows, blockColumns) {
  return Array.from({ length: size * size }, (_, index) => {
    const row = Math.floor(index / size);
    const column = index % size;
    return (row * blockColumns + Math.floor(row / blockRows) + column) % size;
  });
}

export function decodePuzzle(encoded, size) {
  const characters = encoded.replaceAll("/", "").split("");
  if (characters.length !== size * size) throw new Error(`Ungültiges ${size}×${size}-Rätsel.`);
  return characters.map((character) => (character === "." ? -1 : Number(character) - 1));
}

export function createSudokuGame(size = 6, random = Math.random) {
  const level = SUDOKU_LEVELS[size];
  if (!level) throw new Error(`Unbekannte Sudoku-Größe: ${size}`);

  const puzzleIndex = Math.floor(random() * level.puzzles.length);
  const puzzle = decodePuzzle(level.puzzles[puzzleIndex], level.size);
  const solution = createSolution(level.size, level.blockRows, level.blockColumns);

  return {
    size: level.size,
    blockRows: level.blockRows,
    blockColumns: level.blockColumns,
    label: level.label,
    puzzleIndex,
    solution,
    values: [...puzzle],
    givens: puzzle.map((value) => value >= 0),
    foodOrder: shuffledValues(level.size, random),
    selectedValue: null,
    completedBlocks: new Set(),
    solved: false,
  };
}

export function blockIndexFor(game, cellIndex) {
  const row = Math.floor(cellIndex / game.size);
  const column = cellIndex % game.size;
  const blocksPerRow = game.size / game.blockColumns;
  return Math.floor(row / game.blockRows) * blocksPerRow + Math.floor(column / game.blockColumns);
}

export function cellsForBlock(game, blockIndex) {
  const blocksPerRow = game.size / game.blockColumns;
  const blockRow = Math.floor(blockIndex / blocksPerRow);
  const blockColumn = blockIndex % blocksPerRow;
  const cells = [];

  for (let row = blockRow * game.blockRows; row < (blockRow + 1) * game.blockRows; row += 1) {
    for (
      let column = blockColumn * game.blockColumns;
      column < (blockColumn + 1) * game.blockColumns;
      column += 1
    ) {
      cells.push(row * game.size + column);
    }
  }
  return cells;
}

export function placeSudokuValue(game, cellIndex, value) {
  if (
    game.solved ||
    !Number.isInteger(cellIndex) ||
    cellIndex < 0 ||
    cellIndex >= game.values.length ||
    game.givens[cellIndex] ||
    game.values[cellIndex] >= 0
  ) {
    return { status: "ignored", blockCompleted: null, solved: game.solved };
  }

  if (game.solution[cellIndex] !== value) {
    return { status: "wrong", blockCompleted: null, solved: false };
  }

  game.values[cellIndex] = value;
  const blockIndex = blockIndexFor(game, cellIndex);
  const blockComplete = cellsForBlock(game, blockIndex).every((index) => game.values[index] >= 0);
  let blockCompleted = null;

  if (blockComplete && !game.completedBlocks.has(blockIndex)) {
    game.completedBlocks.add(blockIndex);
    blockCompleted = blockIndex;
  }

  game.solved = game.values.every((entry, index) => entry === game.solution[index]);
  return { status: "correct", blockCompleted, solved: game.solved };
}

export function countPuzzleSolutions(encoded, size, stopAfter = 2) {
  const level = SUDOKU_LEVELS[size];
  const grid = decodePuzzle(encoded, size);
  let solutions = 0;

  function solve() {
    if (solutions >= stopAfter) return;

    let bestIndex = -1;
    let bestCandidates = null;

    for (let index = 0; index < grid.length; index += 1) {
      if (grid[index] >= 0) continue;
      const row = Math.floor(index / size);
      const column = index % size;
      const used = new Set();

      for (let cursor = 0; cursor < size; cursor += 1) {
        used.add(grid[row * size + cursor]);
        used.add(grid[cursor * size + column]);
      }

      const blockRow = Math.floor(row / level.blockRows) * level.blockRows;
      const blockColumn = Math.floor(column / level.blockColumns) * level.blockColumns;
      for (let blockY = blockRow; blockY < blockRow + level.blockRows; blockY += 1) {
        for (let blockX = blockColumn; blockX < blockColumn + level.blockColumns; blockX += 1) {
          used.add(grid[blockY * size + blockX]);
        }
      }

      const candidates = Array.from({ length: size }, (_, value) => value).filter(
        (value) => !used.has(value),
      );
      if (!candidates.length) return;
      if (!bestCandidates || candidates.length < bestCandidates.length) {
        bestIndex = index;
        bestCandidates = candidates;
        if (candidates.length === 1) break;
      }
    }

    if (bestIndex < 0) {
      solutions += 1;
      return;
    }

    for (const candidate of bestCandidates) {
      grid[bestIndex] = candidate;
      solve();
      grid[bestIndex] = -1;
      if (solutions >= stopAfter) return;
    }
  }

  solve();
  return solutions;
}
