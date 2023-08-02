import { Col, Row, Image, Button, Container } from "react-bootstrap";
import { AiFillLinkedin, AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import * as AntIcon from "react-icons/ai";
import {
  CVInterface,
  PersonalDataInfo,
  Settings,
} from "../../entities/cvInterfaces";
import { createElement } from "react";

interface Props {
  data: CVInterface;
  isEditing: boolean;
  onEditButton: () => void;
  settings: Settings;
}

const CVPersonalInfo = ({ data, isEditing, onEditButton, settings }: Props) => {
  const personalInfoFields = data.data.personalInfo.fields || [];
  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <h1 className="text-center">{data.data.personalInfo.name}</h1>
      </Row>
      <Row>
        {data.data.personalInfo.photo !== null && (
          <Col
            md={3}
            xs={12}
            className="d-flex justify-content-center d-block-md justify-content-normal-md"
          >
            <Image
              className="shadow cv-photo"
              src={data.data.personalInfo.photo}
            ></Image>
          </Col>
        )}
        <Col md={9} xs={12} className="d-flex flex-column">
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
                    {createElement(AntIcon[field.icon], {
                      size: 30,
                      color: [data.settings.colorTheme?.accent],
                    })}
                    <span className="m-1">{field.value}</span>
                  </div>
                )}
                {!field.icon && (
                  <div className="m-1">
                    <span className="m-1">{field.value}</span>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        {data.data.personalInfo.summary && (
          <div className="m-1 border-top-1">
            <p>{data.data.personalInfo.summary}</p>
          </div>
        )}
      </Row>
      {isEditing === true && (
        <div className="flex pb-3">
          <Button
            className="btn btn-secondary float-end flex"
            onClick={() => {
              onEditButton();
            }}
          >
            Edit Personal Info
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CVPersonalInfo;
