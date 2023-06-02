import { Button, Card, Container, Placeholder, Row } from "react-bootstrap";
import { ImPlus } from "react-icons/im";
import CVPreviewCard from "../Components/CV/CVSectionCardSubComponents/CVPreviewCard";
import CVList from "../mocked-data/cv-data";

const CVPage = () => {
  return (
    <>
      <Container>
        <Row xs={3}>
          <Button variant="secondary" href="/cv-create">
            <ImPlus className="me-2" />
            New CV
          </Button>
        </Row>
        <Row>
          {CVList.map((cv, index) => {
            return <CVPreviewCard cv={cv} key={index} />;
          })}
          <div className="d-flex justify-content-around"></div>
        </Row>
      </Container>
    </>
  );
};

export default CVPage;
