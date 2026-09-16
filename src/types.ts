export type Size = {
  width: number;
  height: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type SquareType = 'wall' | 'empty';

export type Square = {
  coords: Coordinates;
  type: SquareType;
  onPath: boolean;
  isVisited: boolean;
};

export type MazeState = {
  cells: Square[][];
  start: Coordinates | null;
  end: Coordinates | null;
};

export type EditMode = 'setStart' | 'setEnd' | 'setWall';
