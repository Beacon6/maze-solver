import { type Coordinates } from './types';

export function compareCoordinates(coords_a: Coordinates | null, coords_b: Coordinates): boolean {
  return coords_a?.x === coords_b.x && coords_a?.y === coords_b.y;
}
