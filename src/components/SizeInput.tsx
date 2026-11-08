import InputField from './InputField';

import { logger } from '../helpers';
import { type Size } from '../types';

const MIN_WIDTH = 1;
const DEFAULT_WIDTH = 10;
const MAX_WIDTH = 24;
const MIN_HEIGHT = 1;
const DEFAULT_HEIGHT = 10;
const MAX_HEIGHT = 24;

type SizeInputProps = {
  onCreate: (size: Size) => void;
};

function mazeSizeIsValid(size: Size): boolean {
  const { width, height } = size;
  const isValid =
    Number.isInteger(width) &&
    Number.isInteger(height) &&
    MIN_WIDTH <= width &&
    width <= MAX_WIDTH &&
    MIN_HEIGHT <= height &&
    height <= MAX_HEIGHT;

  if (!isValid) {
    logger.error('Invalid maze size:', size);
  }
  return isValid;
}

export default function SizeInput({ onCreate }: SizeInputProps) {
  function handleSubmit(formData: FormData): void {
    const size: Size = {
      width: formData.get('width') ? Number(formData.get('width')) : DEFAULT_WIDTH,
      height: formData.get('height') ? Number(formData.get('height')) : DEFAULT_HEIGHT,
    };

    if (!mazeSizeIsValid(size)) return;
    onCreate(size);
  }

  return (
    <section id="size-input" className="max-w-md mx-auto p-5">
      <h1 className="text-(--text-primary) text-xl font-bold">Create maze</h1>
      <p className="text-(--text-secondary) text-sm mt-2">
        Choose the dimensions for your editable maze grid.
      </p>
      <form action={handleSubmit} className="grid mt-4 gap-4">
        <InputField
          inputName="Width"
          minValue={MIN_WIDTH}
          maxValue={MAX_WIDTH}
          placeholder={DEFAULT_WIDTH.toString()}
        />
        <InputField
          inputName="Height"
          minValue={MIN_HEIGHT}
          maxValue={MAX_HEIGHT}
          placeholder={DEFAULT_HEIGHT.toString()}
        />
        <button type="submit" className="button-primary">
          Create maze
        </button>
      </form>
    </section>
  );
}
