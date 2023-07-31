import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  showModal: boolean;
  onConfirm?: (note: string) => void;
  onDecline?: () => void;
}

const NewCvModal = ({ showModal, onConfirm, onDecline }: Props) => {
  const [show, setShow] = useState(showModal);
  const [noteText, setNoteText] = useState("");

  const inputNoteOnChange = (value: any) => {
    setNoteText(value);
  };

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
          <Modal.Title>New CV</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-wrap">
          <Form.Group>
            <Form.Text className="text-accent">CV Note</Form.Text>
            <Form.Control
              value={noteText}
              type="text"
              name="CVNote"
              onChange={(e) => {
                inputNoteOnChange(e.target.value);
              }}
              placeholder="Cv Note"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (onDecline) onDecline();
              setShow(false);
              setNoteText("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (onConfirm) onConfirm(noteText);
              setShow(false);
              setNoteText("");
            }}
          >
            New CV
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewCvModal;