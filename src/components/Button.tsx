type ButtonVariant = 'primary' | 'danger';

type ButtonProps = {
  text: string;
  variant: ButtonVariant;
  clickAction?: () => void;
};

export default function Button({ text, variant, clickAction }: ButtonProps) {
  return (
    <button type="submit" className={`button-${variant}`} onClick={clickAction}>
      {text}
    </button>
  );
}
