import { type Coordinates, type EditMode, type MazeState } from '../types';

type BoardProps = {
  editMode: EditMode;
  maze: MazeState;
  onMazeChange: (newState: MazeState) => void;
};

export default function Board({ editMode, maze, onMazeChange }: BoardProps) {
  function handleEdit(coords: Coordinates, editMode: EditMode): void {
    const isSelected = (position: Coordinates | null): boolean =>
      position?.x === coords.x && position?.y === coords.y;

    const clearedMaze: MazeState = {
      ...maze,
      start: isSelected(maze.start) ? null : maze.start,
      end: isSelected(maze.end) ? null : maze.end,
      walls: maze.walls.filter((wall) => !isSelected(wall)),
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
            {Array.from({ length: maze.size.width }, (_, x) => {
              const isStart = x === maze.start?.x && y === maze.start?.y;
              const isEnd = x === maze.end?.x && y === maze.end?.y;
              const isWall = maze.walls.some((wall) => x === wall.x && y === wall.y);

              const variant = isStart
                ? 'square--start'
                : isEnd
                  ? 'square--end'
                  : isWall
                    ? 'square--wall'
                    : '';

              return (
                <button
                  key={`${x},${y}`}
                  type="button"
                  onClick={() => handleEdit({ x: x, y: y }, editMode)}
                  className={'square ' + variant}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
