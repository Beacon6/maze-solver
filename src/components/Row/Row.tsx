import './Row.css';

import type { ISquare } from '../Board/Board.tsx';
import { Square } from '../Square/Square.tsx';

type RowProps = {
  squares: ISquare[];
  onEdit: (square: ISquare) => void;
};

export function Row({ squares, onEdit }: RowProps) {
  return squares.map((square) => <Square key={square.coords.x} square={square} onEdit={onEdit} />);
}
