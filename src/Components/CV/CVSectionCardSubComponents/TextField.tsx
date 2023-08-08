import { Col, Row } from "react-bootstrap";

import {
  Settings,
  iTextFieldComponentData,
} from "../../../entities/cvInterfaces";

interface Props {
  data?: iTextFieldComponentData[];
  settings: Settings;
}

const TextField = ({ data, settings }: Props) => {
  if (!data) {
    return null;
  }
  return (
    <div>
      {data.map((content: iTextFieldComponentData, index: number) => {
        return (
          <div key={`textFielWraper-${index}`}>
            <Row key={`textField-${index}`}>
              {(content.startDate || content.endDate) && (
                <Col xs={3}>
                  <p
                    style={{
                      color: `${settings.colorTheme?.heading}`,
                    }}
                  >
                    {content.startDate}
                  </p>
                  <p
                    style={{
                      color: `${settings.colorTheme?.heading}`,
                    }}
                  >
                    {content.endDate}
                  </p>
                </Col>
              )}
              <Col>
                {content.title && (
                  <h3
                    style={{
                      color: `${settings.colorTheme?.heading}`,
                    }}
                  >
                    {content.title}
                  </h3>
                )}
                {content.subtitle && (
                  <h4
                    style={{
                      color: `${settings.colorTheme?.heading}`,
                    }}
                  >
                    {content.subtitle}
                  </h4>
                )}
                {content.description && (
                  <p
                    style={{
                      color: `${settings.colorTheme?.text}`,
                    }}
                  >
                    {content.description}
                  </p>
                )}
                {content.list && (
                  <ul>
                    {content.list.map((item, subIndex) => (
                      <li
                        style={{
                          color: `${settings.colorTheme?.text}`,
                        }}
                        key={`textField-${index}-${subIndex}`}
                      >
                        {item}
                      </li>
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
