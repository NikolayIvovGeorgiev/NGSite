import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { createElement } from "react";
import * as AntIcon from "react-icons/ai";
import { IconType } from "react-icons";

interface Props {
  OnYes: (icon: string | undefined) => void;
}

const sectionDeleteModal = ({ OnYes }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const availableIcons: string[] = [
    "AiFillLinkedin",
    "AiOutlineMail",
    "AiFillPhone",
    "AiFillGithub",
    "AiOutlineShareAlt",
    "AiOutlineLink",
    "AiOutlineClose",
    "AiFillTwitterSquare",
    "AiFillInstagram",
    "AiFillEnvironment",
  ];

  // Use effect can be used to handle asynchronicity
  useEffect(() => {
    handleClose();
  }, []);

  return (
    <>
      <Button
        size="sm"
        className="btn btn-accent float-end"
        onClick={() => {
          handleShow;
        }}
      >
        {" "}
        Delete Section
      </Button>

      {/* TODO find a way to fix this :D */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Section</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-wrap">
          {availableIcons.map((icon, index) => {
            return (
              <p>
                The information in the section will be lost. Do you want to
                continue?
              </p>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default sectionDeleteModal;
