import { compareCoordinates } from '../helpers';
import { type Coordinates, type MazeState, type SolverState } from '../types';

export default async function dfs(
  maze: MazeState,
  solver: SolverState,
  onStep: () => Promise<void>
): Promise<void> {
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  async function walk(
    maze: MazeState,
    solver: SolverState,
    curr: Coordinates,
    onStep: () => Promise<void>
  ): Promise<boolean> {
    if (compareCoordinates(maze.end, curr)) {
      solver.path.push(curr);
      await onStep();
      return true;
    }

    if (
      maze.walls.some((wall) => compareCoordinates(wall, curr)) ||
      solver.seen.some((cell) => compareCoordinates(cell, curr))
    ) {
      return false;
    }

    solver.path.push(curr);
    solver.seen.push(curr);
    await onStep();

    for (let i = 0; i < dirs.length; i++) {
      const nextCell: Coordinates = { x: curr.x + dirs[i][0], y: curr.y + dirs[i][1] };
      if (await walk(maze, solver, nextCell, onStep)) {
        return true;
      }
    }

    solver.path.pop();
    await onStep();
    return false;
  }

  if (!maze.start || !maze.end) {
    throw Error("Maze endpoints cannot be 'null'");
  }
  await walk(maze, solver, maze.start, onStep);
}
