import { type Coordinates } from './types';

export const logger = {
  debug(...args: any[]): void {
    if (import.meta.env.DEV) {
      console.debug(...args);
    }
  },
  info(...args: any[]): void {
    console.info(...args);
  },
  warn(...args: any[]): void {
    console.warn(...args);
  },
  error(...args: any[]): void {
    console.error(...args);
  },
};

export function compareCoordinates(coords_a: Coordinates | null, coords_b: Coordinates): boolean {
  return coords_a?.x === coords_b.x && coords_a?.y === coords_b.y;
}
