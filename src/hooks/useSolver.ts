import { useState } from 'react';

import dfs from '../solvers/dfs';
import { logger, sleep } from '../helpers';
import { type MazeState, type SolverState } from '../types';

export default function useSolver(maze: MazeState) {
  const initialSolverState: SolverState = { path: [], seen: [], finishedSolving: false };

  const [solverState, setSolverState] = useState<SolverState>(() => initialSolverState);

  function solve(): void {
    const clearedSolver = initialSolverState;
    const onStep = async () => {
      setSolverState({
        ...solverState,
        path: [...clearedSolver.path],
        seen: [...clearedSolver.seen],
      });
      await sleep(100);
    };
    dfs(maze, clearedSolver, onStep)
      .then(() => setSolverState((prev) => ({ ...prev, finishedSolving: true })))
      .catch((exc) => {
        logger.error(exc);
      });
  }

  function reset(): void {
    setSolverState(initialSolverState);
  }

  return { solve, reset, solverState };
}
