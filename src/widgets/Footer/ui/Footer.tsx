import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={classNames(className, 'footer')}>
      <Row className="g-1 justify-content-between align-items-center h-100">
        <Col xs={12} sm="auto" className="text-center">
          <p className="mb-0 mt-2 mt-sm-0 text-900">
            Created with love
            <span className="d-none d-sm-inline-block" /> |
            <span className="d-none d-sm-inline-block mx-1">2024 -</span>
            <span className="d-none d-sm-inline-block">{currentYear}</span>
          </p>
        </Col>
        <Col xs={12} sm="auto" className="text-center">
          <p className="mb-0 text-600">{import.meta.env.VITE_APP_VERSION}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
