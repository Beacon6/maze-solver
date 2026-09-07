import { useState } from 'react';

import { Maze } from './components/Maze.tsx';
import { type MazeSize } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { SizeInput } from './components/SizeInput.tsx';

export default function App() {
  const [size, setSize] = useState<MazeSize>();

  function handleSetSize(size: MazeSize): void {
    setSize(size);
    console.debug('Setting maze size:', size);
  }

  return (
    <>
      <header className="max-w-5xl mx-auto p-5">
        <Navbar />
      </header>
      <main className="max-w-5xl mx-auto p-5">
        {size ? <Maze size={size} /> : <SizeInput onCreate={handleSetSize} />}
      </main>
    </>
  );
}
