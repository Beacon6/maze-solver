import { useState } from 'react';

import { Board } from './Board.tsx';
import { Controls } from './Controls.tsx';
import { type MazeSize } from '../App.tsx';

type MazeProps = {
  size: MazeSize;
};

export type EditMode = 'setStart' | 'setEnd' | 'setWall';

export function Maze({ size }: MazeProps) {
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
