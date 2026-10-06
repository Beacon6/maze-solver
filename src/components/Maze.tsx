import { useState } from 'react';

import { type EditMode, type MazeState, type Size } from '../types.ts';
import { Board } from './Board.tsx';
import { createBoard } from '../helpers.ts';
import { EditControls } from './EditControls.tsx';

const DEFAULT_EDIT_MODE: EditMode = 'setStart';

type MazeProps = {
  size: Size;
};

export function Maze({ size }: MazeProps) {
  const [editMode, setEditMode] = useState<EditMode>(DEFAULT_EDIT_MODE);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [mazeState, setMazeState] = useState<MazeState>(() => ({
    board: createBoard(size),
    start: null,
    end: null,
  }));

  function handleEditMode(mode: EditMode): void {
    if (editMode === mode) return;
    setEditMode(mode);
    console.debug('Setting edit mode:', mode);
  }

  function handleSolve(): void {
    if (isSolving) return;
    setIsSolving(true);
    console.debug('handleSolve is not implemented yet');
  }

  // TODO: This should maybe restore to already configured maze
  function handleReset(): void {
    const cleanMazeState = {
      board: createBoard(size),
      start: null,
      end: null,
    };
    setMazeState(cleanMazeState);
    console.debug('Maze state restored to:', cleanMazeState);
  }

  function handleSetMazeState(newState: MazeState): void {
    setMazeState(newState);
    console.debug('New maze state:', newState);
  }

  return (
    <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
      <EditControls
        editMode={editMode}
        onChange={handleEditMode}
        onSolve={handleSolve}
        onReset={handleReset}
      />
      <Board editMode={editMode} maze={mazeState} onMazeChange={handleSetMazeState} />
    </div>
  );
}
