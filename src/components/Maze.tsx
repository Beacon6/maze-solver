import { useState } from 'react';

import Board from './Board';
import EditControls from './EditControls';

import { type EditMode, type MazeState, type Size } from '../types';

const DEFAULT_EDIT_MODE: EditMode = 'setStart';

type MazeProps = {
  size: Size;
};

export default function Maze({ size }: MazeProps) {
  const [mazeState, setMazeState] = useState<MazeState>(() => ({
    size: size,
    start: null,
    end: null,
    walls: [],
  }));
  const [editMode, setEditMode] = useState<EditMode>(DEFAULT_EDIT_MODE);

  function handleSetMazeState(maze: MazeState): void {
    setMazeState(maze);
    console.debug('New maze state:', maze);
  }

  function handleEditMode(mode: EditMode): void {
    if (editMode === mode) return;
    setEditMode(mode);
    console.debug('Setting edit mode:', mode);
  }

  function handleSolve(): void {
    throw Error('handleSolve is not implemented yet');
  }

  function handleReset(): void {
    throw Error('handleReset is not implemented yet');
  }

  return (
    <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
      <EditControls
        editMode={editMode}
        onChange={handleEditMode}
        onSolve={handleSolve}
        onReset={handleReset}
      />
      <Board maze={mazeState} editMode={editMode} onMazeChange={handleSetMazeState} />
    </div>
  );
}
