type Size = {
  width: number;
  height: number;
};

type Coordinates = {
  x: number;
  y: number;
};

type EditMode = 'setStart' | 'setEnd' | 'setWall';

type MazeState = {
  size: Size;
  start: Coordinates | null;
  end: Coordinates | null;
  walls: Coordinates[];
};

type SolverStatus = 'idle' | 'solving' | 'finishedWithSuccess' | 'finishedWithFailure';

type SolverState = {
  path: Coordinates[];
  seen: Coordinates[];
};

export type { Coordinates, EditMode, MazeState, Size, SolverState, SolverStatus };
