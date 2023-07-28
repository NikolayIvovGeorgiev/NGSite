import { Col, Row, Image, Button } from "react-bootstrap";
import { AiFillLinkedin, AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import * as AntIcon from "react-icons/ai";
import { CVInterface, PersonalDataInfo } from "../../entities/cvInterfaces";
import { createElement } from "react";

interface Props {
  data: CVInterface;
  isEditing: boolean;
  onEditButton: () => void;
}

const CVPersonalInfo = ({ data, isEditing, onEditButton }: Props) => {
  const personalInfoFields = data.data.personalInfo.fields || [];
  return (
    <Row>
      {data.data.personalInfo.photo !== null && (
        <Col xs={2}>
          <Image
            className="shadow m-2 fixed-size"
            src={data.data.personalInfo.photo}
          ></Image>
        </Col>
      )}
      <Col xs={10} className="d-flex flex-column">
        <Row className="align-items-center justify-content-center">
          <h1 className="text-center">{data.data.personalInfo.name}</h1>
        </Row>
        <Row>
          {personalInfoFields.map((field, index) => (
            <Col key={index} xs={6} className="d-flex justify-content">
              {field.icon && (
                <div className="justify-content-between mb-3" key={index}>
                  {createElement(AntIcon[field.icon], {
                    size: 30,
                    color: [data.settings.colorTheme.accent],
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
        {data.data.personalInfo.summary && (
          <div className="m-1 border-top-1">
            <p>{data.data.personalInfo.summary}</p>
          </div>
        )}
      </Col>
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
    </Row>
  );
};

export default CVPersonalInfo;
