import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface Props {
  onEditButtonClick: () => void;
}

export const SideCVControlBar = ({ onEditButtonClick }: Props) => {
  return (
    <div className="sidebar">
      <Row>
        <Col xs={12} className="p-2">
          <Button className="btn btn-accent" onClick={onEditButtonClick}>
            Edit
          </Button>
        </Col>
        <Col xs={12} className="p-2">
          <button>Print</button>
        </Col>
        <Col xs={12} className="p-2">
          <button>Download</button>
        </Col>
      </Row>
    </div>
  );
};
