import './Square.css';

import type { ISquare } from '../Board/Board.tsx';

type SquareProps = {
  square: ISquare;
  onPaint: (square: ISquare) => void;
};

export function Square({ square, onPaint }: SquareProps) {
  if (square.isWall) {
    return <div className="square wall"></div>;
  }
  return <div onPointerEnter={() => onPaint(square)} className="square empty"></div>;
}
