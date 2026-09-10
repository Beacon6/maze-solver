import { useState } from 'react';

import { Maze } from './components/Maze.tsx';
import { Navbar } from './components/Navbar.tsx';
import { type Size } from './types.ts';
import { SizeInput } from './components/SizeInput.tsx';

export default function App() {
  const [size, setSize] = useState<Size>();

  function handleSetSize(size: Size): void {
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
