import { type EditMode } from '../App.tsx';

type ModeSwitchProps = {
  editMode: EditMode;
  onChange: (mode: EditMode) => void;
};

export function ModeSwitch({ editMode, onChange }: ModeSwitchProps) {
  const startLabel = 'Set Start';
  const endLabel = 'Set End';
  const wallLabel = 'Paint Walls';

  return (
    <div id="mode-switch" className="flex flex-col gap-1 mx-auto">
      <div className="flex justify-between gap-1">
        <label>{startLabel}</label>
        <input
          id="start"
          name="start"
          checked={editMode === 'setStart'}
          type="radio"
          onChange={() => {
            onChange('setStart');
          }}
        />
      </div>
      <div className="flex justify-between gap-1">
        <label>{endLabel}</label>
        <input
          id="end"
          name="end"
          checked={editMode === 'setEnd'}
          type="radio"
          onChange={() => {
            onChange('setEnd');
          }}
        />
      </div>
      <div className="flex justify-between gap-1">
        <label>{wallLabel}</label>
        <input
          id="wall"
          name="wall"
          checked={editMode === 'setWall'}
          type="radio"
          onChange={() => {
            onChange('setWall');
          }}
        />
      </div>
    </div>
  );
}
