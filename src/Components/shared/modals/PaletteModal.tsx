import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, ToggleButtonGroup } from "react-bootstrap";
import { CvColorThemes } from "../constants/color-themes";
import { ColorTheme } from "../../../entities/cvInterfaces_old";

interface Props {
  showPaletteModal: boolean;
  onConfirm?: (theme: ColorTheme) => void;
  onDecline?: () => void;
}

const ConfirmationModal = ({
  showPaletteModal,
  onConfirm,
  onDecline,
}: Props) => {
  const [show, setShow] = useState(showPaletteModal);
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(
    CvColorThemes[0]
  );

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
          {}
          <ToggleButtonGroup
            type="radio"
            name="theme-button"
            className="mb-2 flex-wrap"
            value={selectedTheme}
          >
            {CvColorThemes.map((theme, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    className="d-none btn btn-check"
                    name="theme-button"
                    id={`${index}`}
                    value={`${index}`}
                    onChange={() => {
                      setSelectedTheme(theme);
                    }}
                  />
                  <label className="btn me-1" htmlFor={`${index}`}>
                    {/* <img src={blueImage} alt="bluePalette" height={100} width={150} />
                     */}
                    <Row style={{ height: 100, width: 175 }} className="mx-1">
                      <Col style={{ background: theme.heading }}></Col>
                      <Col style={{ background: theme.background }}></Col>
                      <Col style={{ background: theme.text }}></Col>
                      <Col style={{ background: theme.accent }}></Col>
                    </Row>
                  </label>
                </div>
              );
            })}
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
              if (onConfirm) onConfirm(selectedTheme);
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
