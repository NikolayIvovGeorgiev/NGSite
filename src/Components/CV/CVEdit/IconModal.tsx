import React, { useState } from "react";
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

  console.log(typeof AntIcon);
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

  const [iconChoice, seticonChoice] = useState(defaultIcon);

  const handleIconClick = (chosenIcon: string) => {
    seticonChoice("");
    seticonChoice(chosenIcon);
    OnSave(iconChoice);
    handleClose();
  };

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
        <Modal.Body>
          <Row>
            <Col>
              <Button className="mb-2" onClick={() => handleIconClick("")}>
                {createElement(AntIcon[`${"AiOutlineCloseCircle"}`], {
                  size: 30,
                  color: "red",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiFillLinkedin")}>
                {createElement(AntIcon[`${"AiFillLinkedin"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiFillGithub")}>
                {createElement(AntIcon[`${"AiFillGithub"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiFillInstagram")}>
                {createElement(AntIcon[`${"AiFillInstagram"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiFillTwitterSquare")}>
                {createElement(AntIcon[`${"AiFillTwitterSquare"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={() => handleIconClick("AiOutlineLink")}>
                {createElement(AntIcon[`${"AiOutlineLink"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiOutlineMail")}>
                {createElement(AntIcon[`${"AiOutlineMail"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiFillPhone")}>
                {createElement(AntIcon[`${"AiFillPhone"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={() => handleIconClick("AiFillEnvironment")}>
                {createElement(AntIcon[`${"AiFillEnvironment"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>

            <Col>
              <Button onClick={() => handleIconClick("AiOutlineShareAlt")}>
                {createElement(AntIcon[`${"AiOutlineShareAlt"}`], {
                  size: 30,
                  color: "blue",
                })}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button
            variant="primary"
            onClick={() => {
              OnSave(iconChoice), handleClose();
            }}
          >
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IconModal;
