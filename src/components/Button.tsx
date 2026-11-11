type ButtonVariant = 'primary' | 'danger' | 'success';

type ButtonProps = {
  text: string;
  variant: ButtonVariant;
  disabled?: boolean;
  clickAction?: () => void;
};

export default function Button({ text, variant, disabled, clickAction }: ButtonProps) {
  return (
    <button type="submit" className={`button-${variant}`} onClick={clickAction} disabled={disabled}>
      {text}
    </button>
  );
}
