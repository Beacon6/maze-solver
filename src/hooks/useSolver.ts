import { useState } from 'react';

import dfs from '../solvers/dfs';
import { compareCoordinates, logger, sleep } from '../helpers';
import { type MazeState, type SolverState, type SolverStatus } from '../types';

const DEFAULT_SOLVER_STATUS: SolverStatus = 'idle';
const DELAY_BETWEEN_STEPS_MS = 25;

function determineStatus(maze: MazeState, solver: SolverState): SolverStatus {
  let last_cell = solver.path.at(-1);
  if (!last_cell || !maze.end) throw Error("Compared coordinates cannot be 'null'");
  if (compareCoordinates(last_cell, maze.end)) return 'finishedWithSuccess';
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
      await sleep(DELAY_BETWEEN_STEPS_MS);
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
