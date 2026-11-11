import { useState } from 'react';

import dfs from '../solvers/dfs';
import { logger, sleep } from '../helpers';
import { type MazeState, type SolverState } from '../types';

export default function useSolver(maze: MazeState) {
  const initialSolverState: SolverState = { path: [], seen: [] };

  const [solverState, setSolverState] = useState<SolverState>(() => initialSolverState);
  const [finishedSolving, setFinishedSolving] = useState<boolean>(() => false);

  async function onStep(): Promise<void> {
    setSolverState({
      path: [...initialSolverState.path],
      seen: [...initialSolverState.seen],
    });
    await sleep(100);
  }

  async function solve(): Promise<void> {
    await dfs(maze, initialSolverState, onStep)
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
