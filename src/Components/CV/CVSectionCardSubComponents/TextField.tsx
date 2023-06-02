import { Col, Row } from "react-bootstrap";

import { iTextFieldComponentData } from "../../../entities/cvInterfaces";

interface Props {
  data?: iTextFieldComponentData[];
}

const TextField = ({ data }: Props) => {
  if (!data) {
    return null;
  }
  return (
    <>
      {data.map((content: iTextFieldComponentData, index: number) => {
        if (content.startDate) {
          return (
            <Row key={index}>
              <Col>
                <p>{content.startDate}</p>
                <p>{content.endDate}</p>
              </Col>
              <Col>
                {" "}
                <h3>{content.title}</h3>
                <h4>{content.subtitle}</h4>
                {content.list && (
                  <ul>
                    {content.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>
          );
        }
        return (
          <>
            {content.title && <h3>{content.title}</h3>}
            {content.subtitle && <h4>{content.subtitle}</h4>}
            {content.description && <p>{content.description}</p>}
            {content.list && (
              <ul>
                {content.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </>
        );
      })}
    </>
  );
};

export default TextField;
