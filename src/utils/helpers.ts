import { type Coordinates } from './types';

const DEFAULT_SLEEP_MS = 100;

function compareCoordinates(coords_a: Coordinates | null, coords_b: Coordinates): boolean {
  return coords_a?.x === coords_b.x && coords_a?.y === coords_b.y;
}

async function sleep(ms: number = DEFAULT_SLEEP_MS): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export { compareCoordinates, sleep };
