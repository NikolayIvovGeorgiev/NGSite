import { Col, Row, Image, Button } from "react-bootstrap";
import { AiFillLinkedin, AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import * as AntIcon from "react-icons/ai";
import { PersonalDataInfo } from "../../entities/cvInterfaces";
import { createElement } from "react";

interface Props {
  data: PersonalDataInfo;
  isEditing: boolean;
  onEditButton: () => void;
}

const CVPersonalInfo = ({ data, isEditing, onEditButton }: Props) => {
  return (
    <Row>
      <Col xs={2}>
        <Image
          className="shadow m-2 fixed-size"
          src="/src/assets/az.jpg"
        ></Image>
      </Col>
      <Col xs={10} className="d-flex flex-column">
        <Row className="align-items-center justify-content-center">
          <h1 className="text-center">{data.name}</h1>
        </Row>
        <Row>
          {data.fields.map((field, index) => (
            <Col key={index} xs={6} className="justify-content">
              {field.icon && (
                <div className="justify-content-between mb-3" key={index}>
                  {createElement(AntIcon[field.icon], {
                    size: 30,
                    color: "blue",
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
        {data.summary && (
          <div className="m-1 border-top-1">
            <p>{data.summary}</p>
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
