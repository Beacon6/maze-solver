import Button, { type ButtonVariant } from './Button';
import Radio from './Radio';
import { type EditMode, type SolverStatus } from '../utils/types';

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

function EditControls({
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
          {modes.map((m) => (
            <Radio
              key={m.value}
              value={m.value}
              label={m.label}
              checked={editMode === m.value}
              disabled={solverStatus === 'solving'}
              onChange={() => onChange(m.value)}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            text="Solve"
            variant={determineVariant(solverStatus)}
            onClick={onSolve}
            disabled={solverStatus === 'solving'}
          />
          <Button
            text="Clear"
            variant="danger"
            onClick={onClear}
            disabled={solverStatus === 'solving'}
          />
        </div>
        <div className="grid gap-2">
          <Button
            text="Reset solution"
            variant="danger"
            onClick={onReset}
            disabled={solverStatus === 'idle' || solverStatus === 'solving'}
          />
        </div>
      </div>
    </section>
  );
}

export default EditControls;
