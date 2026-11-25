import { useState } from 'react';

import Maze from './components/Maze';
import Navbar from './components/Navbar';
import SizeInput from './components/SizeInput';
import { type Size } from './utils/types';

function App() {
  const [size, setSize] = useState<Size>();

  const handleSetSize = (size: Size) => {
    setSize(size);
  };

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

export default App;
