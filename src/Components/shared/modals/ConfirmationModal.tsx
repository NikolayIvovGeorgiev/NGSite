import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  OnClick: boolean;
  onConfirm?: () => void;
  onDecline?: () => void;
}

const ConfirmationModal = ({ OnClick, onConfirm, onDecline }: Props) => {
  const [show, setShow] = useState(OnClick);
  const handleNo = () => {
    if (onDecline) onDecline();
    setShow(false);
  };
  const handleYes = () => {
    if (onConfirm) onConfirm();
    setShow(false);
  };
  useEffect(() => {
    setShow(OnClick);
  }, [OnClick]);

  //   confirmed = show;
  return (
    <>
      <Modal show={show} onHide={handleNo}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-wrap">
          All the data in the component will be lost. Do you want to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNo}>
            No
          </Button>
          <Button variant="secondary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
