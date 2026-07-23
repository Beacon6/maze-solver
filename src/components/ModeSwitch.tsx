import { type EditMode } from '../App.tsx';

type ModeSwitchProps = {
  editMode: EditMode;
  onChange: (mode: EditMode) => void;
};

export function ModeSwitch({ editMode, onChange }: ModeSwitchProps) {
  const modes: { label: string; value: EditMode }[] = [
    { label: 'Start', value: 'setStart' },
    { label: 'End', value: 'setEnd' },
    { label: 'Walls', value: 'setWall' },
  ];

  return (
    <section id="mode-switch">
      <h2 className="text-(--text-primary) text-sm font-bold uppercase mb-3">Edit mode</h2>
      <div className="tool-switch">
        {modes.map((mode) => (
          <label className="tool-option" key={mode.value}>
            <input
              checked={editMode === mode.value}
              name="edit-mode"
              type="radio"
              value={mode.value}
              onChange={() => onChange(mode.value)}
            />
            <span>{mode.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
