import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { Logo } from '@/shared/ui/Icons';
import { AuthForm } from '@/features/AuthForm';

interface IProps {
  logo?: boolean;
  className?: string;
}

const Auth = ({ logo = true, className = 'col-xl-5 col-xxl-3' }: IProps) => (
  <div className="container">
    <Row className="flex-center min-vh-100 py-5">
      <Col sm={10} md={8} lg={5} className={classNames(className)}>
        {logo && (
          <div className="d-flex flex-center text-decoration-none mb-4">
            <Logo text={false} width={58} className="fw-bolder fs-5 d-inline-block" />
          </div>
        )}
        <AuthForm />
      </Col>
    </Row>
  </div>
);

export default Auth;
