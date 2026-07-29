import { type EditMode } from './Maze.tsx';

type ControlsProps = {
  editMode: EditMode;
  onChange: (mode: EditMode) => void;
};

export function Controls({ editMode, onChange }: ControlsProps) {
  const modes: { label: string; value: EditMode }[] = [
    { label: 'Start', value: 'setStart' },
    { label: 'End', value: 'setEnd' },
    { label: 'Walls', value: 'setWall' },
  ];

  return (
    <section id="controls" className="md:sticky md:top-4">
      <h2 className="text-(--text-primary) text-sm text-center font-bold uppercase mb-3">
        Edit mode
      </h2>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 gap-2">
          {modes.map((mode) => (
            <label className="controls-toggle" key={mode.value}>
              <input
                checked={editMode === mode.value}
                type="radio"
                value={mode.value}
                onChange={() => onChange(mode.value)}
              />
              <span>{mode.label}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="button-primary" title="Not implemented yet" disabled>
            Solve
          </button>
          <button className="button-danger" title="Not implemented yet" disabled>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
