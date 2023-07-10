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
      <Col xs="6">
        <Image
          //fluid
          className="shadow m-2 fixed-size"
          src="/src/assets/az.jpg"
        ></Image>
      </Col>

      <Col xs={5}>
        {/* <Row className=" justify-content">
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
        </Row> */}
      </Col>
      <Col xs={1}>
        <Button
          className="btn btn-secondary float-end"
          // onClick={() => {
          //   //TODO ТАЗИ ФУНКЦИЯ ТРЯБВА ДА ИДВА ОТ CVVIEW и да сменя компонента
          //   onClick(index);
          // }}
        >
          Edit
        </Button>
      </Col>
    </Row>
  );
};

export default CVPersonalInfo;
