import { Card, Button, Nav } from "react-bootstrap";
import { CVInterface } from "../../../entities/cvInterfaces";
import { Link } from "react-router-dom";
interface Props {
  cv: CVInterface;
}

const CVPreviewCard = ({ cv }: Props) => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="me-4">
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Text>{cv.note}</Card.Text>
          <Card.Text>
            {new Date(cv.lastEdited).toISOString().split("T")[0]}
          </Card.Text>
          <Nav.Link as={Link} to={`${cv.id}`}>
            <Button variant="primary">View&Edit</Button>
          </Nav.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default CVPreviewCard;
