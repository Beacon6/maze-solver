import './Square.css';

import type { ISquare } from '../Board/Board.tsx';

type SquareProps = {
  square: ISquare;
  onEdit: (square: ISquare) => void;
};

export function Square({ square, onEdit }: SquareProps) {
  let styling = 'square empty';
  if (square.isStart) {
    styling = 'square start';
  } else if (square.isEnd) {
    styling = 'square end';
  } else if (square.isWall) {
    styling = 'square wall';
  } else if (square.isPath) {
    styling = 'square path';
  }

  return <div onClick={() => onEdit(square)} className={styling}></div>;
}
