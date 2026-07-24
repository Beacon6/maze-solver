import { type EditMode } from '../App.tsx';
import { type ISquare } from './Board.tsx';

type SquareProps = {
  square: ISquare;
  editMode: EditMode;
  onEdit: (square: ISquare, editMode: EditMode) => void;
};

export function Square({ square, editMode, onEdit }: SquareProps) {
  const variant = square.isStart
    ? 'square--start'
    : square.isEnd
      ? 'square--end'
      : square.isWall
        ? 'square--wall'
        : square.isPath
          ? 'square--path'
          : square.isVisited
            ? 'square--visited'
            : '';

  return (
    <button
      type="button"
      onClick={() => onEdit(square, editMode)}
      className={`square ${variant}`}
    />
  );
}
