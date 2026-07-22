import { type MazeSize } from '../App.tsx';

type SizeInputProps = {
  onSubmit: (formData: FormData) => void;
};

export function SizeInput({ onSubmit }: SizeInputProps) {
  const defaults: MazeSize = { width: 10, height: 10 };
  const widthLabel = 'Width:';
  const heightLabel = 'Height:';

  return (
    <section className="max-w-md mx-auto p-5">
      <h1 className="text-(--text-primary) text-xl font-bold">Create maze</h1>
      <p className="text-(--text-secondary) text-sm mt-2">
        Choose the dimensions for your editable maze grid.
      </p>
      <form id="size-input" action={onSubmit} className="grid mt-4 gap-4">
        <label htmlFor="width" className="grid gap-1.5 text-(--text-primary) text-sm font-semibold">
          {widthLabel}
          <input
            id="width"
            name="width"
            className="input"
            defaultValue={defaults.width}
            type="number"
            min="1"
            required
          />
        </label>
        <label
          htmlFor="height"
          className="grid gap-1.5 text-(--text-primary) text-sm font-semibold"
        >
          {heightLabel}
          <input
            id="height"
            name="height"
            className="input"
            defaultValue={defaults.height}
            type="number"
            min="1"
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
