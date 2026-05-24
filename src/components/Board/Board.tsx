import { EditControls } from '../EditControls/EditControls.tsx';
import type { EditMode } from '../EditControls/EditControls.tsx';
import { Row } from '../Row/Row.tsx';

import { useState } from 'react';

type BoardProps = {
  size: {
    width: number;
    height: number;
  };
};

export interface ISquare {
  coords: {
    x: number;
    y: number;
  };
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  isVisited: boolean;
}

function initBoard(size: BoardProps['size']): ISquare[][] {
  const board: ISquare[][] = [];
  for (let y = 0; y < size.height; y++) {
    const boardRow: ISquare[] = [];
    for (let x = 0; x < size.width; x++) {
      const square: ISquare = {
        coords: {
          x: x,
          y: y,
        },
        isStart: false,
        isEnd: false,
        isWall: false,
        isPath: false,
        isVisited: false,
      };
      boardRow.push(square);
    }
    board.push(boardRow);
  }
  console.log('Board initialized');
  return board;
}

export function Board({ size }: BoardProps) {
  const [board, setBoard] = useState<ISquare[][]>(() => initBoard(size));
  const [editMode, setEditMode] = useState<EditMode>('setStart');

  function handleEdit(square: ISquare) {
    if (!editMode) {
      return;
    }

    if (editMode === 'setStart') {
      setBoard((currentBoard) =>
        currentBoard.map((row) =>
          row.map((elem) =>
            elem.coords.x === square.coords.x && elem.coords.y === square.coords.y
              ? { ...elem, isStart: true }
              : { ...elem, isStart: false }
          )
        )
      );
    }

    if (editMode === 'setEnd') {
      setBoard((currentBoard) =>
        currentBoard.map((row) =>
          row.map((elem) =>
            elem.coords.x === square.coords.x && elem.coords.y === square.coords.y
              ? { ...elem, isEnd: true }
              : { ...elem, isEnd: false }
          )
        )
      );
    }

    if (editMode === 'setWall') {
      setBoard((currentBoard) =>
        currentBoard.map((row) =>
          row.map((elem) =>
            elem.coords.x === square.coords.x && elem.coords.y === square.coords.y
              ? { ...elem, isWall: !elem.isWall }
              : elem
          )
        )
      );
    }
  }

  function handleChange(mode: EditMode) {
    setEditMode(mode);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(board);
    setEditMode(null);
  }

  function handleReset(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setBoard((currentBoard) =>
      currentBoard.map((row) =>
        row.map((elem) => ({ ...elem, isStart: false, isEnd: false, isWall: false }))
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

  return (
    <>
      {board.map((row) => (
        <div key={row[0].coords.y} className="row">
          <Row squares={row} onEdit={handleEdit} />
        </div>
      ))}
      {editMode ? (
        <EditControls
          editMode={editMode}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      ) : (
        <div>
          <button onClick={() => handleSolve(board)}>Solve!</button>
        </div>
      )}
    </>
  );
}
