type SizeInputProps = {
  handleSubmit: (formData: FormData) => void;
};

export function SizeInput({ handleSubmit }: SizeInputProps) {
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
