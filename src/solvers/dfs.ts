import { compareCoordinates } from '../utils/helpers';
import { type Coordinates, type MazeState, type SolverState } from '../utils/types';

async function dfs(
  maze: MazeState,
  solver: SolverState,
  onStep: (solver: SolverState) => Promise<void>
): Promise<void> {
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const walk = async (
    maze: MazeState,
    solver: SolverState,
    curr: Coordinates,
    onStep: (solver: SolverState) => Promise<void>
  ): Promise<boolean> => {
    if (compareCoordinates(maze.end, curr)) {
      solver.path.push(curr);
      await onStep(solver);
      return true;
    }

    if (
      maze.walls.some((wall) => compareCoordinates(wall, curr)) ||
      solver.seen.some((cell) => compareCoordinates(cell, curr))
    ) {
      return false;
    }

    if (curr.x < 0 || curr.x > maze.size.width - 1 || curr.y < 0 || curr.y > maze.size.height - 1) {
      return false;
    }

    solver.path.push(curr);
    solver.seen.push(curr);
    await onStep(solver);

    for (let i = 0; i < dirs.length; i++) {
      const nextCell: Coordinates = { x: curr.x + dirs[i][0], y: curr.y + dirs[i][1] };
      if (await walk(maze, solver, nextCell, onStep)) {
        return true;
      }
    }

    solver.path.pop();
    await onStep(solver);
    return false;
  };

  if (!maze.start || !maze.end) {
    throw Error("Maze endpoints cannot be 'null'");
  }
  await walk(maze, solver, maze.start, onStep);
}

export default dfs;
