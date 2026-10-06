import { type Size, type Square } from './types.ts';

export function createBoard(size: Size): Square[][] {
  const board: Square[][] = [];
  for (let y = 0; y < size.height; y++) {
    const boardRow: Square[] = [];
    for (let x = 0; x < size.width; x++) {
      const square: Square = {
        coords: {
          x: x,
          y: y,
        },
        type: 'empty',
        onPath: false,
        isVisited: false,
      };
      boardRow.push(square);
    }
    board.push(boardRow);
  }
  console.debug('Maze created with size:', size);
  return board;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
