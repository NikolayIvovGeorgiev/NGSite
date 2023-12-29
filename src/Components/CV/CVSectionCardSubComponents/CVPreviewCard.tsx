import { Card, Button, Nav } from "react-bootstrap";
import { CVInterface } from "../../../entities/cvInterfaces_old";
import { Link } from "react-router-dom";
interface Props {
  cv: CVInterface;
  name: string;
  onDelete: () => void;
}

const CVPreviewCard = ({ cv, name, onDelete }: Props) => {
  const handleDeleteButton = () => {
    if (window.confirm("Are you sure you want to delete this")) {
      onDelete();
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="me-4">
        <Card.Img variant="top" />
        <Card.Text className="flex-row">{name}</Card.Text>
        <Card.Body className="d-flex flex-row">
          <Nav.Link as={Link} to={`${cv.id}?edit=true`}>
            <Button variant="primary">View&Edit</Button>
          </Nav.Link>
          <Button
            variant="danger"
            className="ms-auto"
            onClick={handleDeleteButton}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CVPreviewCard;
