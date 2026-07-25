import { useState } from 'react';

import { Board } from './components/Board.tsx';
import { Controls } from './components/Controls.tsx';
import { NavBar } from './components/NavBar.tsx';
import { SizeInput } from './components/SizeInput.tsx';

export type MazeSize = {
  width: number;
  height: number;
};
export type EditMode = 'setStart' | 'setEnd' | 'setWall';
export type ControlAction = 'solve' | 'reset';

export default function App() {
  const [size, setSize] = useState<MazeSize>();
  const [editMode, setEditMode] = useState<EditMode>('setStart');
  const [controlState, setControlState] = useState<Record<ControlAction, boolean>>({
    solve: false,
    reset: false,
  });

  function handleSetSize(formData: FormData) {
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) return;
    setSize({ width, height });
    console.debug(`Settings 'size' to { width: ${width}, height: ${height} }`);
  }

  function handleEditMode(mode: EditMode) {
    if (editMode === mode) return;
    setEditMode(mode);
    console.debug(`Setting 'editMode' to ${mode}`);
  }

  function handleControl(action: ControlAction, state: boolean) {
    if (controlState[action] === state) return;
    setControlState({ ...controlState, [action]: state });
    console.debug(`Setting '${action}' to ${state}`);
  }

  return (
    <>
      <header className="max-w-5xl mx-auto p-5">
        <nav className="flex items-center justify-between">
          <NavBar />
        </nav>
      </header>
      <main className="max-w-5xl mx-auto p-5">
        {size ? (
          <div className="grid items-start gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
            <Controls editMode={editMode} onChange={handleEditMode} onControl={handleControl} />
            <Board size={size} editMode={editMode} />
          </div>
        ) : (
          <SizeInput onSubmit={handleSetSize} />
        )}
      </main>
    </>
  );
}
