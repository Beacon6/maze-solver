import { type MazeSize } from '../types.ts';

const MIN_WIDTH = 1;
const DEFAULT_WIDTH = 10;
const MAX_WIDTH = 25;
const MIN_HEIGHT = 1;
const DEFAULT_HEIGHT = 10;
const MAX_HEIGHT = 25;

type SizeInputProps = {
  onCreate: (size: MazeSize) => void;
};

const mazeSizeIsValid = (size: MazeSize): boolean => {
  const { width, height } = size;

  const isValid =
    Number.isInteger(width) &&
    Number.isInteger(height) &&
    MIN_WIDTH <= width &&
    width <= MAX_WIDTH &&
    MIN_HEIGHT <= height &&
    height <= MAX_HEIGHT;

  if (!isValid) {
    console.warn('Invalid maze size:', size);
  }

  return isValid;
};

export function SizeInput({ onCreate }: SizeInputProps) {
  const handleSubmit = (formData: FormData) => {
    const size: MazeSize = {
      width: Number(formData.get('width')),
      height: Number(formData.get('height')),
    };

    if (!mazeSizeIsValid(size)) return;

    onCreate(size);
  };

  return (
    <section id="size-input" className="max-w-md mx-auto p-5">
      <h1 className="text-(--text-primary) text-xl font-bold">Create maze</h1>
      <p className="text-(--text-secondary) text-sm mt-2">
        Choose the dimensions for your editable maze grid.
      </p>
      <form action={handleSubmit} className="grid mt-4 gap-4">
        <label htmlFor="width" className="grid gap-1.5 text-(--text-primary) text-sm font-semibold">
          Width ({MIN_WIDTH}–{MAX_WIDTH})
          <input
            id="width"
            name="width"
            className="input"
            defaultValue={DEFAULT_WIDTH}
            type="number"
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            required
          />
        </label>
        <label
          htmlFor="height"
          className="grid gap-1.5 text-(--text-primary) text-sm font-semibold"
        >
          Height ({MIN_HEIGHT}–{MAX_HEIGHT})
          <input
            id="height"
            name="height"
            className="input"
            defaultValue={DEFAULT_HEIGHT}
            type="number"
            min={MIN_HEIGHT}
            max={MAX_HEIGHT}
            required
          />
        </label>
        <button type="submit" className="button-primary">
          Create maze
        </button>
      </form>
    </section>
  );
}
