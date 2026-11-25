import { useState } from 'react';

import dfs from '../solvers/dfs';
import { compareCoordinates, logger, sleep } from '../utils/helpers';
import { type MazeState, type SolverState, type SolverStatus } from '../utils/types';

const DEFAULT_SOLVER_STATUS: SolverStatus = 'idle';
const DELAY_BETWEEN_STEPS_MS = 25;

function determineStatus(maze: MazeState, solver: SolverState): SolverStatus {
  const last_cell = solver.path.at(-1) ?? null;
  if (!maze.end) throw Error("Maze endpoints cannot be 'null'");
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

  function resetSolver(): void {
    setSolverState(createInitialSolverState());
    setSolverStatus('idle');
  }

  return { solve, resetSolver, solverState, solverStatus };
}
