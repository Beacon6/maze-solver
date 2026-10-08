import { useState } from 'react';

import Maze from './components/Maze';
import Navbar from './components/Navbar';
import SizeInput from './components/SizeInput';

import { type Size } from './types';

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
