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
  isCurrent: boolean;
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
        isCurrent: false,
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
  const [isEditable, setIsEditable] = useState<boolean>(true);

  function handlePaint(square: ISquare) {
    if (!isEditable) {
      return;
    }

    setBoard((currentBoard) =>
      currentBoard.map((row) =>
        row.map((elem) =>
          elem.coords.x === square.coords.x && elem.coords.y === square.coords.y
            ? { ...elem, isWall: true }
            : elem
        )
      )
    );
  }

  return (
    <>
      {board.map((row) => (
        <div key={row[0].coords.y} className="row">
          <Row squares={row} onPaint={handlePaint} />
        </div>
      ))}
    </>
  );
}
