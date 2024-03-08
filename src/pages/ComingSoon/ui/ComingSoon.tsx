import { Col, Row } from 'react-bootstrap';
import Lottie from 'lottie-react';
import comingSoonLight from '@/shared/assets/images/animated-icons/coming-soon-light.json';
import comingSoonDark from '@/shared/assets/images/animated-icons/coming-soon-dark.json';
import comingSoonText from '@/shared/assets/images/spot-illustrations/43.png';
import comingSoonTextDark from '@/shared/assets/images/spot-illustrations/dark_43.png';
import { useAppContext } from '@/shared/providers/AppProvider';

const ComingSoon = () => {
  const {
    config: { theme },
  } = useAppContext();

  return (
    <Row className="flex-center content-min-h pb-9">
      <Col xs={12} xxl={10}>
        <Row className="align-items-xl-center g-2">
          <Col xs={12} xl={6} className="order-xl-1">
            <div className="d-flex flex-center">
              <Lottie
                animationData={theme === 'light' ? comingSoonLight : comingSoonDark}
                loop={true}
                className="w-xl-100 animation"
              />
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div className="d-flex justify-content-center mt-xl-15">
              <div className="text-container text-center text-xl-start">
                <img
                  src={comingSoonText}
                  alt=""
                  className="mb-5 w-75 w-lg-50 w-xl-75 w-xxl-100 d-dark-none"
                  style={{ maxWidth: 415 }}
                />
                <img
                  src={comingSoonTextDark}
                  alt=""
                  className="mb-5 w-75 w-lg-50 w-xl-75 w-xxl-100 d-light-none"
                  style={{ maxWidth: 415 }}
                />

                <h2 className="text-gray-800 fs-xl-6 mb-3">Эта страница все еще в разработке:(</h2>
                <p className="mb-6 w-xxl-75">
                  Она будет реализована в самые кратчайшие сроки ( вероятно )
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ComingSoon;
