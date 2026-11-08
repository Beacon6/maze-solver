import { type Coordinates } from './types';

const DEFAULT_SLEEP_MS = 100;

export const logger = {
  debug(...args: unknown[]): void {
    if (import.meta.env.DEV) {
      console.debug(...args);
    }
  },
  info(...args: unknown[]): void {
    console.info(...args);
  },
  warn(...args: unknown[]): void {
    console.warn(...args);
  },
  error(...args: unknown[]): void {
    console.error(...args);
  },
};

export function compareCoordinates(coords_a: Coordinates | null, coords_b: Coordinates): boolean {
  return coords_a?.x === coords_b.x && coords_a?.y === coords_b.y;
}

export async function sleep(ms: number = DEFAULT_SLEEP_MS): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
