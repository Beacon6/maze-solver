import { type EditMode, type MazeState, type Square } from '../types.ts';
import { Row } from './Row.tsx';

type BoardProps = {
  editMode: EditMode;
  maze: MazeState;
  onMazeChange: (newState: MazeState) => void;
};

export function Board({ editMode, maze, onMazeChange }: BoardProps) {
  function handleEdit(square: Square, editMode: EditMode): void {
    if (editMode === 'setWall') {
      const newMaze = structuredClone(maze);
      const selectedSquare = newMaze.board[square.coords.y][square.coords.x];
      selectedSquare.type = selectedSquare.type === 'empty' ? 'wall' : 'empty';
      onMazeChange(newMaze);
      return;
    }

    const modeToParamMap = {
      setStart: 'start',
      setEnd: 'end',
    } as const;

    onMazeChange({
      ...maze,
      [modeToParamMap[editMode]]: square.coords,
    });
  }

  // async function handleSolve(board: ISquare[][]) {
  //   const dirs = [
  //     [0, -1],
  //     [1, 0],
  //     [0, 1],
  //     [-1, 0],
  //   ];
  //
  //   async function walk(maze: ISquare[][], currentPosition: ISquare): Promise<boolean> {
  //     if (currentPosition.isEnd) {
  //       currentPosition.isPath = true;
  //       setBoard(cloneBoard(maze));
  //       return true;
  //     }
  //
  //     if (currentPosition.isWall || currentPosition.isVisited) {
  //       return false;
  //     }
  //
  //     currentPosition.isPath = true;
  //     currentPosition.isVisited = true;
  //     setBoard(cloneBoard(maze));
  //     await sleep(50);
  //
  //     for (let i = 0; i < dirs.length; i++) {
  //       const nextPosition =
  //         maze[currentPosition.coords.y + dirs[i][1]][currentPosition.coords.x + dirs[i][0]];
  //       if (await walk(maze, nextPosition)) {
  //         return true;
  //       }
  //     }
  //
  //     currentPosition.isPath = false;
  //     setBoard(cloneBoard(maze));
  //     await sleep(50);
  //     return false;
  //   }
  //
  //   const maze = cloneBoard(board);
  //   const currentPosition = maze[1][1];
  //   await walk(maze, currentPosition);
  // }

  return (
    <section id="maze">
      <h2 className="text-(--text-primary) text-sm text-center font-bold uppercase mb-3">Maze</h2>
      <div className="grid place-items-center gap-1">
        {maze.board.map((row) => (
          <Row key={row[0].coords.y} row={row} editMode={editMode} handleEdit={handleEdit} />
        ))}
      </div>
    </section>
  );
}
