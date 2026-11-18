import { useState } from 'react';

import Maze from './components/Maze';
import Navbar from './components/Navbar';
import SizeInput from './components/SizeInput';

import { type Size } from './types';

function App() {
  const [size, setSize] = useState<Size>();

  return (
    <>
      <header className="max-w-5xl mx-auto p-5">
        <Navbar />
      </header>
      <main className="max-w-5xl mx-auto p-5">
        {size ? <Maze size={size} /> : <SizeInput onSubmit={setSize} />}
      </main>
    </>
  );
}

export default App;
