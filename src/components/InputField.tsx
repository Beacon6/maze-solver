type InputFieldProps = {
  text: string;
  minValue: number;
  maxValue: number;
  placeholder: string;
};

export default function InputField({ text, minValue, maxValue, placeholder }: InputFieldProps) {
  return (
    <label
      htmlFor={text.toLowerCase()}
      className="grid gap-1.5 text-(--text-primary) text-sm font-semibold"
    >
      {text} ({minValue} - {maxValue})
      <input
        id={text.toLowerCase()}
        name={text.toLowerCase()}
        className="input"
        placeholder={placeholder}
        type="number"
        min={minValue}
        max={maxValue}
      />
    </label>
  );
}
