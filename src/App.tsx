import { useState } from "react";

type MazeSize = {
  width: number;
  height: number;
};

type SizeInputProps = {
  handleSubmit: (formData: FormData) => void;
};

function SizeInput({ handleSubmit }: SizeInputProps) {
  return (
    <div>
      <div> Enter the maze dimensions: </div>
      <form action={handleSubmit}>
        <div>
          <input name="width" placeholder="W" type="number"></input>
          <input name="height" placeholder="H" type="number"></input>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  const [size, setSize] = useState<MazeSize | null>(null);

  function handleSubmit(formData: FormData) {
    const width = Number(formData.get("width"));
    const height = Number(formData.get("height"));

    setSize({ width, height });
  }

  return <>{!size && <SizeInput handleSubmit={handleSubmit} />}</>;
}
