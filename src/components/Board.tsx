import { useCallback } from 'react';

import Square from './Square';

import { compareCoordinates } from '../helpers';
import { type Coordinates, type EditMode, type MazeState, type SolverState } from '../types';

type BoardProps = {
  maze: MazeState;
  solver: SolverState;
  editMode: EditMode;
  onMazeChange: React.Dispatch<React.SetStateAction<MazeState>>;
};

export default function Board({ maze, solver, editMode, onMazeChange }: BoardProps) {
  const handleEdit = useCallback(
    (coords: Coordinates): void => {
      onMazeChange((m) => {
        const wasStart = compareCoordinates(m.start, coords);
        const wasEnd = compareCoordinates(m.end, coords);
        const clearedMaze: MazeState = {
          ...m,
          start: wasStart ? null : m.start,
          end: wasEnd ? null : m.end,
          walls: m.walls.filter((wall) => !compareCoordinates(wall, coords)),
        };

        if (editMode === 'setWall') {
          const wasWall = m.walls.some((wall) => compareCoordinates(wall, coords));
          return {
            ...clearedMaze,
            walls: wasWall ? clearedMaze.walls : [...clearedMaze.walls, coords],
          };
        }

        const modeToParamMap = {
          setStart: { check: wasStart, param: 'start' },
          setEnd: { check: wasEnd, param: 'end' },
        } as const;

        return {
          ...clearedMaze,
          [modeToParamMap[editMode].param]: modeToParamMap[editMode].check
            ? clearedMaze[modeToParamMap[editMode].param]
            : coords,
        };
      });
    },
    [editMode, onMazeChange]
  );

  return (
    <section id="maze">
      <h2 className="text-(--text-primary) text-sm text-center font-bold uppercase mb-3">Maze</h2>
      <div className="grid place-items-center gap-1">
        {Array.from({ length: maze.size.height }, (_, y) => (
          <div key={y} className="grid grid-flow-col gap-1">
            {Array.from({ length: maze.size.width }, (_, x) => {
              const position = { x: x, y: y };
              const isStart = compareCoordinates(maze.start, position);
              const isEnd = compareCoordinates(maze.end, position);
              const isWall = maze.walls.some((wall) => compareCoordinates(wall, position));
              const isPath = solver.path.some((cell) => compareCoordinates(cell, position));
              const isSeen = solver.seen.some((cell) => compareCoordinates(cell, position));

              return (
                <Square
                  key={`${x},${y}`}
                  x={x}
                  y={y}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  isPath={isPath}
                  isSeen={isSeen}
                  editMode={editMode}
                  onEdit={handleEdit}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
