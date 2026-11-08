type InputFieldProps = {
  inputName: string;
  minValue: number;
  maxValue: number;
  placeholder: string;
};

export default function InputField({
  inputName,
  minValue,
  maxValue,
  placeholder,
}: InputFieldProps) {
  return (
    <label
      htmlFor={inputName.toLowerCase()}
      className="grid gap-1.5 text-(--text-primary) text-sm font-semibold"
    >
      {inputName} ({minValue} - {maxValue})
      <input
        id={inputName.toLowerCase()}
        name={inputName.toLowerCase()}
        className="input"
        placeholder={placeholder}
        type="number"
        min={minValue}
        max={maxValue}
      />
    </label>
  );
}
