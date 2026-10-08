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
    const wasStart = compareCoordinates(maze.start, coords);
    const wasEnd = compareCoordinates(maze.end, coords);
    const clearedMaze: MazeState = {
      ...maze,
      start: wasStart ? null : maze.start,
      end: wasEnd ? null : maze.end,
      walls: maze.walls.filter((wall) => !compareCoordinates(wall, coords)),
    };

    if (editMode === 'setWall') {
      const wasWall = maze.walls.some((wall) => compareCoordinates(wall, coords));
      onMazeChange({
        ...clearedMaze,
        walls: wasWall ? clearedMaze.walls : [...clearedMaze.walls, coords],
      });
      return;
    }

    const modeToParamMap = {
      setStart: { check: wasStart, param: 'start' },
      setEnd: { check: wasEnd, param: 'end' },
    } as const;

    onMazeChange({
      ...clearedMaze,
      [modeToParamMap[editMode].param]: modeToParamMap[editMode].check ? clearedMaze.start : coords,
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
