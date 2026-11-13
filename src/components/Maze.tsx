import { useState } from 'react';

import Board from './Board';
import EditControls from './EditControls';
import useSolver from '../hooks/useSolver';

import { logger } from '../helpers';
import { type EditMode, type MazeState, type Size } from '../types';

const DEFAULT_EDIT_MODE: EditMode = 'setStart';

type MazeProps = {
  size: Size;
};

export default function Maze({ size }: MazeProps) {
  const createInitialMazeState = (): MazeState => ({
    size: size,
    start: null,
    end: null,
    walls: [],
  });

  const [mazeState, setMazeState] = useState<MazeState>(createInitialMazeState);
  const [editMode, setEditMode] = useState<EditMode>(DEFAULT_EDIT_MODE);
  const { solve, reset, solverState, solverStatus } = useSolver(mazeState);

  function handleSetMazeState(maze: MazeState): void {
    setMazeState(maze);
    logger.debug('New maze state:', maze);
  }

  function handleEditMode(mode: EditMode): void {
    if (editMode === mode) return;
    setEditMode(mode);
    logger.debug('Setting edit mode:', mode);
  }

  function handleClear(): void {
    setMazeState(createInitialMazeState());
    reset();
    logger.debug('Maze state has been reset');
  }

  return (
    <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
      <EditControls
        editMode={editMode}
        solverStatus={solverStatus}
        onChange={handleEditMode}
        onSolve={() => solve()}
        onClear={handleClear}
        onReset={() => reset()}
      />
      <Board
        maze={mazeState}
        solver={solverState}
        editMode={editMode}
        onMazeChange={handleSetMazeState}
      />
    </div>
  );
}
