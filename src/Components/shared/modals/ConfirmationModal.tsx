import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  showModal: boolean;
  onConfirm?: () => void;
  onDecline?: () => void;
}

const ConfirmationModal = ({ showModal, onConfirm, onDecline }: Props) => {
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-wrap">
          All the data in the component will be lost. Do you want to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (onDecline) onDecline();
              setShow(false);
            }}
          >
            No
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (onConfirm) onConfirm();
              setShow(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
