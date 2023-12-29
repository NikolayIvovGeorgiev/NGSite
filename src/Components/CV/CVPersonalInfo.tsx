import { Col, Row, Image, Button } from "react-bootstrap";
import * as AntIcon from "react-icons/ai";
import { CVInterface, Settings } from "../../entities/cvInterfaces_old";
import { createElement } from "react";

interface Props {
  data: CVInterface;
  settings: Settings;
}

const CVPersonalInfo = ({ data }: Props) => {
  const personalInfoFields = data.personalInfoFields || [];
  return (
    <div>
      <Row className="mb-5">
        {data.image !== null && (
          <Col
            md={3}
            xs={12}
            className="d-flex justify-content-center d-block-md justify-content-normal-md"
          >
            <Image className="shadow cv-photo" src={data.image}></Image>
          </Col>
        )}
        <Col md={9} xs={12} className="d-flex flex-column">
          <Row>
            <h1
              className="mb-5 fs-h1-top-normalize"
              // style={{
              //   color: `${settings.colorTheme?.heading}`,
              // }}
            >
              {data.cvName}
            </h1>
          </Row>

          <Row>
            {personalInfoFields.map((field, index) => (
              <Col
                key={index}
                lg={6}
                xs={12}
                className="d-flex justify-content"
              >
                {field.icon && (
                  <div className="justify-content-between mb-3" key={index}>
                    {createElement(
                      AntIcon[field.icon as keyof typeof AntIcon],
                      {
                        size: 30,
                        // color: [data.settings.colorTheme?.accent],
                      }
                    )}
                    <span
                      className="m-1"
                      style={
                        {
                          // color: `${settings.colorTheme?.text}`,
                        }
                      }
                    >
                      {field.value}
                    </span>
                  </div>
                )}
                {!field.icon && (
                  <div className="m-1">
                    <span
                      className="m-1"
                      style={
                        {
                          // color: `${settings.colorTheme?.text}`,
                        }
                      }
                    >
                      {field.value}
                    </span>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
        <Row>
          {data.summary && (
            <div>
              <p
                className="m-0"
                style={
                  {
                    // color: `${settings.colorTheme?.heading}`,
                  }
                }
              >
                {data.summary}
              </p>
            </div>
          )}
        </Row>
      </Row>
    </div>
  );
};

export default CVPersonalInfo;
