import './Board.css';

type BoardProps = {
  size: {
    width: number;
    height: number;
  };
};

type BoardRowProps = {
  points: Point[];
};

type Point = {
  x: number;
  y: number;
};

function initBoard(size: BoardProps['size']): Point[][] {
  const board: Point[][] = [];
  for (let y = 0; y < size.height; y++) {
    const boardRow: Point[] = [];
    for (let x = 0; x < size.width; x++) {
      boardRow.push({ x, y });
    }
    board.push(boardRow);
  }
  return board;
}

function BoardRow({ points }: BoardRowProps) {
  return points.map((square) => <div className="square"></div>);
}

export function Board({ size }: BoardProps) {
  const board = initBoard(size);

  return (
    <>
      {board.map((row) => (
        <div className="row">
          <BoardRow points={row} />
        </div>
      ))}
    </>
  );
}
