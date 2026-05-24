export type EditMode = 'setStart' | 'setEnd' | 'setWall' | null;

type EditControlsProps = {
  editMode: EditMode;
  onChange: (mode: EditMode) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  onReset: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export function EditControls({ editMode, onChange, onSubmit, onReset }: EditControlsProps) {
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
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
            checked={editMode === 'setWall'}
            onChange={() => {
              onChange('setWall');
            }}
          />
          Paint Wall
        </label>
      </fieldset>
      <fieldset>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </fieldset>
    </form>
  );
}
