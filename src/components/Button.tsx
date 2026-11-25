export type ButtonVariant = 'primary' | 'danger' | 'success' | 'error';

type ButtonProps = {
  text: string;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ text, variant, disabled, onClick }: ButtonProps) {
  return (
    <button type="submit" className={`button-${variant}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
