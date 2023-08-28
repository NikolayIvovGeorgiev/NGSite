import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface Props {
  onEditButtonClick: () => void;
  onColorPaletteClick: () => void;
  onPrintButtonClick: () => void;
  onSaveButtonClick: () => void;
}

export const SideCVControlBar = ({
  onEditButtonClick,
  onColorPaletteClick,
  onPrintButtonClick,
  onSaveButtonClick,
}: Props) => {
  return (
    <div className="fixed-bar bg-white left-0 bottom-0 z-10 shadow-lg">
      <div className="container p-0 d-flex justify-content-end py-2">
        <Button
          variant="primary"
          className="me-3"
          onClick={onColorPaletteClick}
        >
          Color Palette
        </Button>
        <Button variant="primary" className="me-3" onClick={onEditButtonClick}>
          Edit
        </Button>
        <Button variant="primary" className="me-3" onClick={onPrintButtonClick}>
          Print
        </Button>
        <Button variant="primary" onClick={onSaveButtonClick}>
          {" "}
          Download
        </Button>
      </div>
    </div>
  );
};
