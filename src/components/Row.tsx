import { type EditMode } from '../App.tsx';
import { type ISquare } from './Board.tsx';
import { Square } from './Square.tsx';

type RowProps = {
  row: ISquare[];
  editMode: EditMode;
  handleEdit: (square: ISquare, editMode: EditMode) => void;
};

export function Row({ row, editMode, handleEdit }: RowProps) {
  return (
    <div className="grid grid-flow-col gap-1">
      {row.map((square) => (
        <Square key={square.coords.x} square={square} editMode={editMode} onEdit={handleEdit} />
      ))}
    </div>
  );
}
