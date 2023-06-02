import React from "react";
import { Card, Button, Placeholder, Nav } from "react-bootstrap";
import { CVInterface } from "../../../entities/cvInterfaces";
import { Link } from "react-router-dom";
interface Props {
  cv: CVInterface;
}

const CVPreviewCard = ({ cv }: Props) => {
  return (
    <>
      <Nav.Link as={Link} to={`${cv.id}`}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>{cv.id}</Card.Title>
            <Card.Text>{cv.note}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Nav.Link>
    </>
  );
};

export default CVPreviewCard;
