import { useState } from 'react';

import Board from './Board';
import EditControls from './EditControls';
import useSolver from '../hooks/useSolver';
import { type EditMode, type MazeState, type Size } from '../utils/types';

const DEFAULT_EDIT_MODE: EditMode = 'setStart';

type MazeProps = {
  size: Size;
};

function Maze({ size }: MazeProps) {
  const createInitialMazeState = (): MazeState => ({
    size: size,
    start: null,
    end: null,
    walls: [],
  });

  const [mazeState, setMazeState] = useState<MazeState>(createInitialMazeState);
  const [editMode, setEditMode] = useState<EditMode>(DEFAULT_EDIT_MODE);
  const { solve, resetSolver, solverState, solverStatus } = useSolver(mazeState);

  const handleEditMode = (mode: EditMode): void => {
    if (editMode === mode) return;
    setEditMode(mode);
  };

  const handleClear = (): void => {
    setMazeState(createInitialMazeState);
    resetSolver();
  };

  return (
    <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
      <EditControls
        editMode={editMode}
        solverStatus={solverStatus}
        onChange={handleEditMode}
        onSolve={solve}
        onClear={handleClear}
        onReset={resetSolver}
      />
      <Board
        maze={mazeState}
        solver={solverState}
        editMode={editMode}
        onMazeChange={setMazeState}
      />
    </div>
  );
}

export default Maze;
