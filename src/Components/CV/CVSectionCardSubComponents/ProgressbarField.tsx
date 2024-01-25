
import { Col, Row } from "react-bootstrap";
import { iProgressBarComponentData } from "../../../entities/cvInterfaces";

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
            <Row
              key={index}
              className="mediaSize align-self-md-center align-items-center"
            >
              <Col
                md={6}
                sm={12}
                // style={{
                //   color: `${settings.colorTheme?.text}`,
                // }}
              >
                {content.title}
              </Col>
              <Col md={6} sm={12} className=" mediaSize align-self-md-center">
                <div
                  className="progress "
                  // style={{
                  //   backgroundColor: `${settings.colorTheme?.heading}`,
                  //   margin: 10,
                  //   padding: 2,
                  // }}
                >
                  <div
                    className="progress-bar "
                    role="progressbar"
                    // style={{
                    //   backgroundColor: `${settings.colorTheme?.accent}`,
                    //   width: `${content.level * 10}%`,
                    //   borderRadius: "4px",
                    // }}
                    aria-valuenow={content.level}
                    aria-valuemin={0}
                    aria-valuemax={10}
                  ></div>
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressbarField;
