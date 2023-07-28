import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import blueImage from "/src/assets/blue.jpg";
import yellowImage from "/src/assets/Yellow.jpg";
import { color } from "chart.js/helpers";

interface Props {
  showPaletteModal: boolean;
  onConfirm?: (color: string) => void;
  onDecline?: () => void;
}

const ConfirmationModal = ({
  showPaletteModal,
  onConfirm,
  onDecline,
}: Props) => {
  const [show, setShow] = useState(showPaletteModal);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    setShow(showPaletteModal);
  }, [showPaletteModal]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Color Palette</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToggleButtonGroup
            type="radio"
            name="options"
            className="mb-2"
            value={selectedColor}
            onChange={(color) => setSelectedColor(color)}
          >
            <ToggleButton
              className="flex p-2  btn-no-hover me-5"
              id="blue"
              value={"blue"}
              type="radio"
            >
              <img src={blueImage} alt="bluePalette" height={100} width={150} />
            </ToggleButton>
            <ToggleButton
              className="flex p-2 btn-no-hover btn-no-hover-bg"
              id="yellow"
              value={"yellow"}
              type="radio"
            >
              <img
                src={yellowImage}
                alt="yellowPallete"
                height={100}
                width={150}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (onDecline) onDecline();
              setShow(false);
            }}
          >
            Stay with current colors
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (onConfirm) onConfirm(selectedColor || "");
              setShow(false);
            }}
          >
            Set new CV Colors
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
