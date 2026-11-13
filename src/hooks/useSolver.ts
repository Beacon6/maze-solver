import { useState } from 'react';

import dfs from '../solvers/dfs';
import { compareCoordinates, logger, sleep } from '../helpers';
import { type MazeState, type SolverState, type SolverStatus } from '../types';

const DEFAULT_SOLVER_STATUS: SolverStatus = 'idle';

function determineStatus(maze: MazeState, solver: SolverState): SolverStatus {
  if (compareCoordinates(solver.path.at(-1), maze.end)) {
    return 'finishedWithSuccess';
  }
  return 'finishedWithFailure';
}

export default function useSolver(maze: MazeState) {
  const createInitialSolverState = (): SolverState => ({ path: [], seen: [] });

  const [solverState, setSolverState] = useState<SolverState>(createInitialSolverState);
  const [solverStatus, setSolverStatus] = useState<SolverStatus>(DEFAULT_SOLVER_STATUS);

  async function solve(): Promise<void> {
    setSolverStatus('solving');
    const workingSolverState = createInitialSolverState();

    const onStep = async () => {
      setSolverState({
        path: [...workingSolverState.path],
        seen: [...workingSolverState.seen],
      });
      await sleep(100);
    };

    await dfs(maze, workingSolverState, onStep)
      .then(() => setSolverStatus(determineStatus(maze, workingSolverState)))
      .catch((exc) => {
        setSolverStatus('idle');
        logger.error(exc);
      });
  }

  function reset(): void {
    setSolverState(createInitialSolverState());
    setSolverStatus('idle');
  }

  return { solve, reset, solverState, solverStatus };
}
