import { useState } from 'react';
import { SizeInput } from './components/SizeInput/SizeInput.tsx';
import { Board } from './components/Board/Board.tsx';

type MazeSize = {
  width: number;
  height: number;
};

export default function App() {
  const [size, setSize] = useState<MazeSize | null>(null);

  function handleSubmit(formData: FormData) {
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));

    setSize({ width, height });
  }

  return <>{!size ? <SizeInput handleSubmit={handleSubmit} /> : <Board size={size} />}</>;
}
