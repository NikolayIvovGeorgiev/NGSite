import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface Props {
  onEditButtonClick: () => void;
  onColorPaletteClick: () => void;
}

export const SideCVControlBar = ({
  onEditButtonClick,
  onColorPaletteClick,
}: Props) => {
  return (
    <div className="sidebar z-10">
      <div className="container p-0 d-flex justify-content-end py-2">
        <Button className="btn btn-accent me-3" onClick={onColorPaletteClick}>
          Color Palette
        </Button>
        <Button className="btn btn-accent me-3" onClick={onEditButtonClick}>
          Edit
        </Button>
        <Button className="btn btn-primary me-3" color="white">
          Print
        </Button>
        <Button className="btn btn-accent"> Download</Button>
      </div>
    </div>
  );
};
