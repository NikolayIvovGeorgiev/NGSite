import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { createElement } from "react";
import * as AntIcon from "react-icons/ai";
import { IconType } from "react-icons";

interface Props {
  defaultIcon: string | undefined;
  OnSave: (icon: string | undefined) => void;
}

const IconModal = ({ defaultIcon, OnSave }: Props) => {
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

  // useState generates async functions!!
  const [iconChoice, seticonChoice] = useState(defaultIcon);

  const handleIconClick = (chosenIcon: string) => {
    seticonChoice(chosenIcon);
    // OnSave(chosenIcon);
    // handleClose();
  };

  // Use effect can be used to handle asynchronicity
  useEffect(() => {
    OnSave(iconChoice);
    handleClose();
  }, [iconChoice]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {/* TODO find a way to fix this :D */}
        {iconChoice &&
          createElement(AntIcon[iconChoice], {
            size: 30,
            color: "blue",
          })}
        {!iconChoice &&
          createElement(AntIcon[`${"AiOutlineCloseCircle"}`], {
            size: 30,
            color: "red",
          })}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Icon</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-wrap">
          {availableIcons.map((icon, index) => {
            return (
              <span key={icon + index}>
                {icon === "AiOutlineCloseCircle" && (
                  <Button
                    className="mb-2 p-2  flex"
                    onClick={() => handleIconClick("")}
                  >
                    {createElement(AntIcon[icon], {
                      size: 30,
                      color: "red",
                    })}
                  </Button>
                )}
                {icon !== "AiOutlineCloseCircle" && (
                  <Button
                    className="mb-2 p-2 m-2 flex"
                    onClick={() => handleIconClick(icon)}
                  >
                    {createElement(AntIcon[icon], {
                      size: 30,
                      color: "blue",
                    })}
                  </Button>
                )}
              </span>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IconModal;
