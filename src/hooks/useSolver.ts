import { useState } from 'react';

import dfs from '../solvers/dfs';
import { logger, sleep } from '../helpers';
import { type MazeState, type SolverState } from '../types';

export default function useSolver(maze: MazeState) {
  const createInitialSolverState = (): SolverState => ({ path: [], seen: [] });

  const [solverState, setSolverState] = useState<SolverState>(createInitialSolverState);
  const [finishedSolving, setFinishedSolving] = useState<boolean>(false);

  async function solve(): Promise<void> {
    const workingSolverState = createInitialSolverState();

    const onStep = async () => {
      setSolverState({
        path: [...workingSolverState.path],
        seen: [...workingSolverState.seen],
      });
      await sleep(100);
    };

    await dfs(maze, workingSolverState, onStep)
      .then(() => setFinishedSolving(true))
      .catch((exc) => {
        logger.error(exc);
      });
  }

  function reset(): void {
    setSolverState(createInitialSolverState());
    setFinishedSolving(false);
  }

  return { solve, reset, solverState, finishedSolving };
}
