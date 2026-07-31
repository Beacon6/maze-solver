import { useState } from 'react';

import { type EditMode, type MazeSize, type Square } from '../types.ts';
import { Board } from './Board.tsx';
import { Controls } from './Controls.tsx';
import { createBoard } from '../helpers/board.ts';

type MazeProps = {
  size: MazeSize;
};

export function Maze({ size }: MazeProps) {
  const [board, setBoard] = useState<Square[][]>(() => createBoard(size));
  const [editMode, setEditMode] = useState<EditMode>('setStart');

  function handleEditMode(mode: EditMode) {
    if (editMode === mode) return;
    setEditMode(mode);
    console.debug(`Setting 'editMode' to ${mode}`);
  }

  return (
    <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
      <Controls editMode={editMode} onChange={handleEditMode} />
      <Board size={size} editMode={editMode} />
    </div>
  );
}
