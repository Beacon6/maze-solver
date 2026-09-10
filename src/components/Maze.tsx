import { useState } from 'react';

import { type EditMode, type Size, type Square } from '../types.ts';
import { Board } from './Board.tsx';
import { Controls } from './Controls.tsx';

const DEFAULT_EDIT_MODE: EditMode = 'setStart';

type MazeProps = {
  size: Size;
};

function createBoard(size: Size): Square[][] {
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

export function Maze({ size }: MazeProps) {
  const [editMode, setEditMode] = useState<EditMode>(DEFAULT_EDIT_MODE);
  const [board, setBoard] = useState<Square[][]>(() => createBoard(size));

  function handleEditMode(mode: EditMode): void {
    if (editMode === mode) return;
    setEditMode(mode);
    console.debug('Setting edit mode:', mode);
  }

  function handleSetBoard(board: Square[][]): void {
    setBoard(board);
  }

  return (
    <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
      <Controls editMode={editMode} onChange={handleEditMode} />
      <Board editMode={editMode} board={board} onBoardChange={handleSetBoard} />
    </div>
  );
}
