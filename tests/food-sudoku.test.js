import test from "node:test";
import assert from "node:assert/strict";

import {
  SUDOKU_LEVELS,
  blockIndexFor,
  cellsForBlock,
  countPuzzleSolutions,
  createSudokuGame,
  createSolution,
  decodePuzzle,
  placeSudokuValue,
} from "../food-sudoku.js";

for (const [sizeText, level] of Object.entries(SUDOKU_LEVELS)) {
  const size = Number(sizeText);

  test(`${size}×${size}: alle Rätsel sind gültig und eindeutig lösbar`, () => {
    const solution = createSolution(size, level.blockRows, level.blockColumns);

    for (const encoded of level.puzzles) {
      const puzzle = decodePuzzle(encoded, size);
      assert.equal(countPuzzleSolutions(encoded, size), 1);
      puzzle.forEach((value, index) => {
        if (value >= 0) assert.equal(value, solution[index]);
      });
    }
  });

  test(`${size}×${size}: Lösung erfüllt Zeilen, Spalten und Blöcke`, () => {
    const game = createSudokuGame(size, () => 0);
    const expected = Array.from({ length: size }, (_, index) => index);

    for (let row = 0; row < size; row += 1) {
      assert.deepEqual([...game.solution.slice(row * size, (row + 1) * size)].sort(), expected);
    }
    for (let column = 0; column < size; column += 1) {
      const values = Array.from({ length: size }, (_, row) => game.solution[row * size + column]);
      assert.deepEqual(values.sort(), expected);
    }
    for (let block = 0; block < size; block += 1) {
      const values = cellsForBlock(game, block).map((index) => game.solution[index]);
      assert.deepEqual(values.sort(), expected);
    }
  });
}

test("falsche Eingaben werden abgelehnt, richtige werden eingetragen", () => {
  const game = createSudokuGame(6, () => 0);
  const emptyIndex = game.values.findIndex((value) => value < 0);
  const solution = game.solution[emptyIndex];
  const wrong = (solution + 1) % game.size;

  assert.equal(placeSudokuValue(game, emptyIndex, wrong).status, "wrong");
  assert.equal(game.values[emptyIndex], -1);
  assert.equal(placeSudokuValue(game, emptyIndex, solution).status, "correct");
  assert.equal(game.values[emptyIndex], solution);
  assert.equal(placeSudokuValue(game, emptyIndex, solution).status, "ignored");
});

test("Blockabschluss und Sieg werden jeweils korrekt gemeldet", () => {
  const game = createSudokuGame(6, () => 0);
  const targetBlock = blockIndexFor(game, game.values.findIndex((value) => value < 0));
  const emptyBlockCells = cellsForBlock(game, targetBlock).filter((index) => game.values[index] < 0);

  emptyBlockCells.slice(0, -1).forEach((index) => placeSudokuValue(game, index, game.solution[index]));
  const blockResult = placeSudokuValue(
    game,
    emptyBlockCells.at(-1),
    game.solution[emptyBlockCells.at(-1)],
  );
  assert.equal(blockResult.blockCompleted, targetBlock);
  assert.equal(game.completedBlocks.size, 1);

  let finalResult;
  game.values.forEach((value, index) => {
    if (value < 0) finalResult = placeSudokuValue(game, index, game.solution[index]);
  });
  assert.equal(finalResult.solved, true);
  assert.equal(game.solved, true);
});
