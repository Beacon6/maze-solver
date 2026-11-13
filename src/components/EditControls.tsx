import Button from './Button';

import { type ButtonVariant, type EditMode, type SolverStatus } from '../types';

type EditControlsProps = {
  editMode: EditMode;
  solverStatus: SolverStatus;
  onChange: (mode: EditMode) => void;
  onSolve: () => void;
  onClear: () => void;
  onReset: () => void;
};

function determineVariant(status: SolverStatus): ButtonVariant {
  if (status === 'finishedWithSuccess') return 'success';
  if (status === 'finishedWithFailure') return 'error';
  return 'primary';
}

export default function EditControls({
  editMode,
  solverStatus,
  onChange,
  onSolve,
  onClear,
  onReset,
}: EditControlsProps) {
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
          <Button
            text="Solve"
            variant={determineVariant(solverStatus)}
            clickAction={onSolve}
            disabled={solverStatus === 'solving'}
          />
          <Button
            text="Clear"
            variant="danger"
            clickAction={onClear}
            disabled={solverStatus === 'solving'}
          />
        </div>
        <div className="grid gap-2">
          <Button
            text="Reset solution"
            variant="danger"
            clickAction={onReset}
            disabled={solverStatus === 'idle' || solverStatus === 'solving'}
          />
        </div>
      </div>
    </section>
  );
}
