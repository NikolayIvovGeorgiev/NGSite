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
      {data.map((currentTextField: iTextFieldComponentData, index: number) => {
        return (
          <div key={`textFielWraper-${index}`}>
            <Row key={`textField-${index}`}>
              {(currentTextField.startDate || currentTextField.endDate) && (
                <Col xs={2}>
                  <p
                    // style={{
                    //   color: `${settings.colorTheme?.heading}`,
                    // }}
                  >
                    {`${currentTextField.startDate}`}
                  </p>
                  <p
                    // style={{
                    //   color: `${settings.colorTheme?.heading}`,
                    // }}
                  >
                    {`${currentTextField.endDate}`}
                  </p>
                </Col>
              )}
              <Col>
                {currentTextField.title && (
                  <h3
                    // style={{
                    //   color: `${settings.colorTheme?.heading}`,
                    // }}
                  >
                    {currentTextField.title}
                  </h3>
                )}
                {currentTextField.subtitle && (
                  <h4
                    // style={{
                    //   color: `${settings.colorTheme?.heading}`,
                    // }}
                  >
                    {currentTextField.subtitle}
                  </h4>
                )}
                {currentTextField.description && (
                  <p
                    // style={{
                    //   color: `${settings.colorTheme?.text}`,
                    // }}
                  >
                    {currentTextField.description}
                  </p>
                )}
                {currentTextField.list && (
                  <ul>
                    {currentTextField.list.map((item, subIndex) => (
                      <li
                        // style={{
                        //   color: `${settings.colorTheme?.text}`,
                        // }}
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
