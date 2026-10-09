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
