import { FloatingLabel, Form, FormControlProps } from 'react-bootstrap';

interface IProps extends Omit<FormControlProps, 'size' | 'onChange'> {
  size?: 'sm' | 'lg';
  containerClassName?: string;
  label?: string;
  controlId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  size = 'lg',
  containerClassName,
  label,
  controlId,
  onChange,
  ...otherProps
}: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  if (size === 'sm') {
    return (
      <Form.Group className={containerClassName} controlId={controlId}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          {...otherProps}
          onChange={handleChange}
          placeholder={otherProps.placeholder}
        />
      </Form.Group>
    );
  }
  return (
    <FloatingLabel className={containerClassName} controlId={controlId} label={label ?? ''}>
      <Form.Control {...otherProps} onChange={handleChange} />
    </FloatingLabel>
  );
};

export default Input;
