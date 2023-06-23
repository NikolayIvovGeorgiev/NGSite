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
    <div>
      {data.map((content: iProgressBarComponentData, index: number) => {
        return (
          <div key={`textProgress-${index + 1}`}>
            <Row key={index}>
              <Col>{content.title}</Col>
              <Col>
                <ProgressBar animated max={10} now={content.level} />
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressbarField;
