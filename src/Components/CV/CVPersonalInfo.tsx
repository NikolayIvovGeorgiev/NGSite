import { Col, Row, Image, Button } from "react-bootstrap";
import { AiFillLinkedin, AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import * as AntIcon from "react-icons/ai";
import { PersonalDataInfo } from "../../entities/cvInterfaces";
import { createElement } from "react";

interface Props {
  data: PersonalDataInfo;
}

const CVPersonalInfo = ({ data }: Props) => {
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
    </Row>
  );
};
{
  /* <Row>
      <Col xs="2">
        <Image
          //fluid
          className="shadow m-2 fixed-size"
          src="/src/assets/az.jpg"
        ></Image>
      </Col>
      <Col xs={10}>
        <h1 className="">{data.name}</h1>
      </Col>

      <Col xs={5}> */
}
{
  /* <Row className=" justify-content">
          <Col className=" pt-5 justify-content-md-center">
            <div className=" mb-5">
              {createElement(AntIcon[`${"AiFillAlert"}`], {
                size: 30,
                color: "blue",
              })}
              <AiFillLinkedin size={30} color="blue" />
              <i className="fa-solid fa-dinosaur"></i>
              {}
            </div>
            <div>
              <FaCity size={30} color="blue" />
              {data.city}
            </div>
          </Col>
          <Col className=" pt-5  justify-content-md-center">
            <div className=" mb-5">
              <AiOutlineMail size={30} color="blue" />
              {data.email}
            </div>
            <div>
              <AiFillPhone size={30} color="blue" />
              {data.phone}
            </div>
          </Col>
        </Row> */
}
{
  /* </Col> */
}

//   </Row>
// );

export default CVPersonalInfo;
