import { Button, Col, Container, Row } from "react-bootstrap";
import CVSideBar from "../Components/CV/CVSideBar";
import { FaBackward } from "react-icons/fa";
import CVView from "../Components/CV/CVEdit/CVView";
import CVList from "../mocked-data/cv-data";
const CVCreate = () => {
  return (
    <div className="p-2">
      <Container>
        <Row>
          <Col xs lg="6">
            <Button variant="secondary" href="/cv">
              <FaBackward className="me-2" />
              Back
            </Button>
            <CVSideBar />
          </Col>
          <Col xs="6">
            <CVView cv={CVList[0]} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CVCreate;
