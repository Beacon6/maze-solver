export type MazeSize = {
  width: number;
  height: number;
};

export type EditMode = 'setStart' | 'setEnd' | 'setWall';

export type Square = {
  coords: {
    x: number;
    y: number;
  };
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  isVisited: boolean;
};
