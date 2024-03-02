import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import { Form } from 'react-bootstrap';

const SignInForm = () => {
  return (
    <>
      <div className="text-center mb-3">
        <h3 className="text-1000">Sign In</h3>
        <p className="text-700">Get access to your account</p>
      </div>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="email"
            type="email"
            className="form-icon-input"
            placeholder="name@example.com"
          />
          <FontAwesomeIcon icon={faUser} className="text-900 fs-9 form-icon" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="password">Password</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="password"
            type="password"
            className="form-icon-input"
            placeholder="Password"
          />
          <FontAwesomeIcon icon={faKey} className="text-900 fs-9 form-icon" />
        </div>
      </Form.Group>
      <Button variant="primary" className="w-100 mb-3">
        Sign In
      </Button>
    </>
  );
};

export default SignInForm;
