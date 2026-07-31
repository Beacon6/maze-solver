import { useState } from 'react';

import { Row } from './Row.tsx';

type BoardProps = {
  size: MazeSize;
  editMode: EditMode;
};

export function Board({ size, editMode }: BoardProps) {
  const [board, setBoard] = useState<ISquare[][]>(() => initBoard(size));

  function handleEdit(square: ISquare, editMode: EditMode) {
    const modeToParamMap = {
      setStart: 'isStart',
      setEnd: 'isEnd',
      setWall: 'isWall',
    };
    setBoard((currentBoard) =>
      currentBoard.map((row) =>
        row.map((elem) =>
          elem.coords.x === square.coords.x && elem.coords.y === square.coords.y
            ? { ...elem, [modeToParamMap[editMode]]: true }
            : { ...elem, [modeToParamMap[editMode]]: false }
        )
      )
    );
  }

  function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  function cloneBoard(board: ISquare[][]): ISquare[][] {
    return board.map((row) =>
      row.map((square) => ({
        ...square,
        coords: { ...square.coords },
      }))
    );
  }

  async function handleSolve(board: ISquare[][]) {
    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    async function walk(maze: ISquare[][], currentPosition: ISquare): Promise<boolean> {
      if (currentPosition.isEnd) {
        currentPosition.isPath = true;
        setBoard(cloneBoard(maze));
        return true;
      }

      if (currentPosition.isWall || currentPosition.isVisited) {
        return false;
      }

      currentPosition.isPath = true;
      currentPosition.isVisited = true;
      setBoard(cloneBoard(maze));
      await sleep(50);

      for (let i = 0; i < dirs.length; i++) {
        const nextPosition =
          maze[currentPosition.coords.y + dirs[i][1]][currentPosition.coords.x + dirs[i][0]];
        if (await walk(maze, nextPosition)) {
          return true;
        }
      }

      currentPosition.isPath = false;
      setBoard(cloneBoard(maze));
      await sleep(50);
      return false;
    }

    const maze = cloneBoard(board);
    const currentPosition = maze[1][1];
    await walk(maze, currentPosition);
  }

  async function handleSolveClick() {
    setIsSolving(true);
    try {
      await handleSolve(board);
    } finally {
      setIsSolving(false);
    }
  }

  return (
    <section id="maze">
      <h2 className="text-(--text-primary) text-sm text-center font-bold uppercase mb-3">Maze</h2>
      <div className="grid place-items-center gap-1">
        {board.map((row) => (
          <Row key={row[0].coords.y} row={row} editMode={editMode} handleEdit={handleEdit} />
        ))}
      </div>
    </section>
  );
}
