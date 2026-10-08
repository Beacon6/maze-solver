import Square from './Square';

import { compareCoordinates } from '../helpers';
import { type Coordinates, type EditMode, type MazeState } from '../types';

type BoardProps = {
  maze: MazeState;
  editMode: EditMode;
  onMazeChange: (newState: MazeState) => void;
};

export default function Board({ maze, editMode, onMazeChange }: BoardProps) {
  function handleEdit(coords: Coordinates, editMode: EditMode): void {
    const clearedMaze: MazeState = {
      ...maze,
      start: compareCoordinates(maze.start, coords) ? null : maze.start,
      end: compareCoordinates(maze.end, coords) ? null : maze.end,
      walls: maze.walls.filter((wall) => !compareCoordinates(wall, coords)),
    };

    if (editMode === 'setWall') {
      onMazeChange({
        ...clearedMaze,
        walls: [...clearedMaze.walls, coords],
      });
      return;
    }

    const modeToParamMap = {
      setStart: 'start',
      setEnd: 'end',
    } as const;

    onMazeChange({
      ...clearedMaze,
      [modeToParamMap[editMode]]: coords,
    });
  }

  return (
    <section id="maze">
      <h2 className="text-(--text-primary) text-sm text-center font-bold uppercase mb-3">Maze</h2>
      <div className="grid place-items-center gap-1">
        {Array.from({ length: maze.size.height }, (_, y) => (
          <div key={y} className="grid grid-flow-col gap-1">
            {Array.from({ length: maze.size.width }, (_, x) => (
              <Square
                key={`${x},${y}`}
                maze={maze}
                position={{ x: x, y: y }}
                editMode={editMode}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
