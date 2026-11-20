type RadioProps = {
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  changeAction: () => void;
};

function Radio({ value, label, checked, disabled, changeAction }: RadioProps) {
  return (
    <label className="controls-toggle">
      <input
        type="radio"
        checked={checked}
        value={value}
        onChange={changeAction}
        disabled={disabled}
      />
      <span>{label}</span>
    </label>
  );
}

export default Radio;
