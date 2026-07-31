import { type MazeSize, type Square } from '../types.ts';

export function createBoard(size: MazeSize): Square[][] {
  const board: Square[][] = [];
  for (let y = 0; y < size.height; y++) {
    const boardRow: Square[] = [];
    for (let x = 0; x < size.width; x++) {
      const square: Square = {
        coords: {
          x: x,
          y: y,
        },
        isStart: false,
        isEnd: false,
        isWall: false,
        isPath: false,
        isVisited: false,
      };
      boardRow.push(square);
    }
    board.push(boardRow);
  }
  return board;
}
