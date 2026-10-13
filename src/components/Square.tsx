import { compareCoordinates } from '../helpers';
import { type Coordinates, type EditMode, type MazeState, type SolverState } from '../types';

type SquareProps = {
  maze: MazeState;
  solver: SolverState;
  position: Coordinates;
  editMode: EditMode;
  onEdit: (coords: Coordinates, editMode: EditMode) => void;
};

export default function Square({ maze, solver, position, editMode, onEdit }: SquareProps) {
  const isStart = compareCoordinates(maze.start, position);
  const isEnd = compareCoordinates(maze.end, position);
  const isWall = maze.walls.some((wall) => compareCoordinates(wall, position));
  const isPath = solver.path.some((cell) => compareCoordinates(cell, position));
  const isSeen = solver.seen.some((cell) => compareCoordinates(cell, position));

  const variant = isStart
    ? 'square--start'
    : isEnd
      ? 'square--end'
      : isWall
        ? 'square--wall'
        : isPath
          ? 'square--path'
          : isSeen
            ? 'square--seen'
            : '';

  return (
    <button
      type="button"
      onClick={() => {
        if (editMode === 'setStart' || editMode === 'setEnd') {
          onEdit(position, editMode);
        }
      }}
      onMouseDown={(e) => {
        if (editMode === 'setWall' && e.button === 0) {
          onEdit(position, editMode);
        }
      }}
      onMouseEnter={(e) => {
        if (editMode === 'setWall' && e.buttons === 1) {
          onEdit(position, editMode);
        }
      }}
      className={'square ' + variant}
    />
  );
}
