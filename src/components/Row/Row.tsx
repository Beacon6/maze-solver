import './Row.css';

import type { ISquare } from '../Board/Board.tsx';
import { Square } from '../Square/Square.tsx';

type RowProps = {
  squares: ISquare[];
  onPaint: (square: ISquare) => void;
};

export function Row({ squares, onPaint }: RowProps) {
  return squares.map((square) => (
    <Square key={square.coords.x} square={square} onPaint={onPaint} />
  ));
}
