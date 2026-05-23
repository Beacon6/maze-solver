export type EditMode = 'setStart' | 'setEnd' | 'paintWalls';

type EditControlsProps = {
  editMode: EditMode;
  onChange: (mode: EditMode) => void;
};

export function EditControls({ editMode, onChange }: EditControlsProps) {
  return (
    <form>
      <fieldset>
        <legend>Edit Mode</legend>

        <label>
          <input
            type="radio"
            id="setStartChoice"
            name="editMode"
            value="setStart"
            checked={editMode === 'setStart'}
            onChange={() => {
              onChange('setStart');
            }}
          />
          Set Start
        </label>

        <label>
          <input
            type="radio"
            id="setEndChoice"
            name="editMode"
            value="setEnd"
            checked={editMode === 'setEnd'}
            onChange={() => {
              onChange('setEnd');
            }}
          />
          Set End
        </label>

        <label>
          <input
            type="radio"
            id="paintWallsChoice"
            name="editMode"
            value="paintWalls"
            checked={editMode === 'paintWalls'}
            onChange={() => {
              onChange('paintWalls');
            }}
          />
          Paint Wall
        </label>
      </fieldset>
    </form>
  );
}
