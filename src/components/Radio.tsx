type RadioProps = {
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: () => void;
};

function Radio({ value, label, checked, disabled, onChange }: RadioProps) {
  return (
    <label className="controls-toggle">
      <input type="radio" checked={checked} value={value} onChange={onChange} disabled={disabled} />
      <span>{label}</span>
    </label>
  );
}

export default Radio;
