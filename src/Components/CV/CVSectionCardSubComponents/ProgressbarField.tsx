import ProgressBar from "react-bootstrap/ProgressBar";
import { iProgressBarComponentData } from "../../../entities/cvInterfaces";
import { Col, Row } from "react-bootstrap";

interface Props {
  data?: iProgressBarComponentData[];
}

const ProgressbarField = ({ data }: Props) => {
  if (!data) {
    return null;
  }
  return (
    <>
      {data.map((content: iProgressBarComponentData, index: number) => {
        return (
          <>
            <Row key={index}>
              <Col>{content.title}</Col>
              <Col>
                <ProgressBar animated max={10} now={content.level} />
              </Col>
            </Row>
          </>
        );
      })}
    </>
  );
};

export default ProgressbarField;
