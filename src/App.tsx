import { useState } from 'react';

import { Maze } from './components/Maze.tsx';
import { Navbar } from './components/Navbar.tsx';
import { SizeInput } from './components/SizeInput.tsx';

export type MazeSize = {
  width: number;
  height: number;
};

export default function App() {
  const [size, setSize] = useState<MazeSize>();

  function handleSetSize(formData: FormData) {
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) return;
    setSize({ width, height });
    console.debug(`Settings 'size' to { width: ${width}, height: ${height} }`);
  }

  return (
    <>
      <header className="max-w-5xl mx-auto p-5">
        <Navbar />
      </header>
      <main className="max-w-5xl mx-auto p-5">
        {size ? <Maze size={size} /> : <SizeInput onSubmit={handleSetSize} />}
      </main>
    </>
  );
}
