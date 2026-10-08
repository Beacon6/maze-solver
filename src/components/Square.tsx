import { compareCoordinates } from '../helpers';
import { type Coordinates, type EditMode, type MazeState } from '../types';

type SquareProps = {
  maze: MazeState;
  position: Coordinates;
  editMode: EditMode;
  onEdit: (coords: Coordinates, editMode: EditMode) => void;
};

export default function Square({ maze, position, editMode, onEdit }: SquareProps) {
  const isStart = compareCoordinates(maze.start, position);
  const isEnd = compareCoordinates(maze.end, position);
  const isWall = maze.walls.some((wall) => compareCoordinates(wall, position));

  const variant = isStart ? 'square--start' : isEnd ? 'square--end' : isWall ? 'square--wall' : '';

  return (
    <button
      type="button"
      onClick={() => onEdit(position, editMode)}
      className={'square ' + variant}
    />
  );
}
