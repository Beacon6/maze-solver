import { useState } from 'react';

import dfs from '../solvers/dfs';
import { logger, sleep } from '../helpers';
import { type MazeState, type SolverState } from '../types';

export default function useSolver(maze: MazeState) {
  const initialSolverState: SolverState = { path: [], seen: [] };

  const [solverState, setSolverState] = useState<SolverState>(() => initialSolverState);
  const [finishedSolving, setFinishedSolving] = useState<boolean>(false);

  function solve(): void {
    const clearedSolver = initialSolverState;
    const onStep = async () => {
      setSolverState({
        path: [...clearedSolver.path],
        seen: [...clearedSolver.seen],
      });
      await sleep(100);
    };
    dfs(maze, clearedSolver, onStep)
      .then(() => setFinishedSolving(true))
      .catch((exc) => {
        logger.error(exc);
      });
  }

  function reset(): void {
    setSolverState(initialSolverState);
    setFinishedSolving(false);
  }

  return { solve, reset, solverState, finishedSolving };
}
