import { memo } from 'react';

import { type Coordinates, type EditMode } from '../types';

type SquareProps = {
  x: number;
  y: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  isSeen: boolean;
  editMode: EditMode;
  onEdit: (coords: Coordinates) => void;
};

const Square = memo(function Square({
  x,
  y,
  isStart,
  isEnd,
  isWall,
  isPath,
  isSeen,
  editMode,
  onEdit,
}: SquareProps) {
  const position = { x: x, y: y };
  const variant = isStart
    ? 'square--start'
    : isEnd
      ? 'square--end'
      : isWall
        ? 'square--wall'
        : isPath
          ? 'square--path'
          : isSeen
            ? 'square--seen'
            : '';

  return (
    <button
      type="button"
      onClick={() => {
        if (editMode === 'setStart' || editMode === 'setEnd') {
          onEdit(position);
        }
      }}
      onMouseDown={(e) => {
        if (editMode === 'setWall' && e.button === 0) {
          onEdit(position);
        }
      }}
      onMouseEnter={(e) => {
        if (editMode === 'setWall' && e.buttons === 1) {
          onEdit(position);
        }
      }}
      className={'square ' + variant}
    />
  );
});

export default Square;
