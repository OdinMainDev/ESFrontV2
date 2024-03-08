import { FloatingLabel, FloatingLabelProps, Form } from 'react-bootstrap';

interface IProps extends FloatingLabelProps {}

const Input = ({ ...otherProps }: IProps) => {
  return (
    <FloatingLabel controlId={otherProps.controlId} label={otherProps.label}>
      <Form.Control {...otherProps} />
    </FloatingLabel>
  );
};

export default Input;
