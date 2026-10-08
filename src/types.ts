export type Size = {
  width: number;
  height: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type EditMode = 'setStart' | 'setEnd' | 'setWall';

export type MazeState = {
  size: Size;
  start: Coordinates | null;
  end: Coordinates | null;
  walls: Coordinates[];
};
