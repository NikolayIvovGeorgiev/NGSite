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
    <div>
      {/* {data.map((content: iTextFieldComponentData, index: number) => {
        if (content.startDate) {
          return (
            <div key={`textFielWraper-${index}`}>
              <Row key={`textField-${index}`}>
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
                      {content.list.map((item, subIndex) => (
                        <li key={`textFieldList-${subIndex}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </Col>
              </Row>n
            </div>
          );
        }
        return (
          <div key={`textFielWraper-${index + 10}`}>
            {content.title && <h3>{content.title}</h3>}
            {content.subtitle && <h4>{content.subtitle}</h4>}
            {content.description && <p>{content.description}</p>}
            {content.list && (
              <ul>
                {content.list.map((item, subIndex) => (
                  <li key={`textField-${index}-${subIndex}`}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })} */}
      {data.map((content: iTextFieldComponentData, index: number) => {
        return (
          <div key={`textFielWraper-${index}`}>
            <Row key={`textField-${index}`}>
              {(content.startDate || content.endDate) && (
                <Col xs={3}>
                  <p>{content.startDate}</p>
                  <p>{content.endDate}</p>
                </Col>
              )}
              <Col>
                {content.title && <h3>{content.title}</h3>}
                {content.subtitle && <h4>{content.subtitle}</h4>}
                {content.description && <p>{content.description}</p>}
                {content.list && (
                  <ul>
                    {content.list.map((item, subIndex) => (
                      <li key={`textField-${index}-${subIndex}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default TextField;
