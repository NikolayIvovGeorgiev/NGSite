import { Col, Row, Image, Button } from "react-bootstrap";

const CVPersonalInfoSkeleton = () => {
  return (
    <>
      <Row>
        <Col xs={2}>
          <div className="skeleton-image"></div>
        </Col>
        <Col xs={10} className="d-flex flex-column">
          <Row className="align-items-center justify-content-center">
            <div className="skeleton-text skeleton-name"></div>
          </Row>
          <Row>
            <Col xs={6} className="justify-content d-flex">
              <div className="skeleton-text skeleton-icon me-1"></div>
              <div className="skeleton-text skeleton-value"></div>
            </Col>
            <Col xs={6} className="justify-content d-flex ">
              <div className="skeleton-text skeleton-icon me-1"></div>
              <div className="skeleton-text skeleton-value"></div>
            </Col>
            <Col xs={6} className="justify-content d-flex">
              <div className="skeleton-text skeleton-icon me-1"></div>
              <div className="skeleton-text skeleton-value"></div>
            </Col>
            <Col xs={6} className="justify-content d-flex ">
              <div className="skeleton-text skeleton-icon me-1"></div>
              <div className="skeleton-text skeleton-value"></div>
            </Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            <div className=" skeleton-text skeleton-summary "></div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default CVPersonalInfoSkeleton;
