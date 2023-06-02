import { Col, Row, Image } from "react-bootstrap";
import { AiFillLinkedin, AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { PersonalDataInfo } from "../../entities/cvInterfaces";

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
          src="./src/assets/az.jpg"
        ></Image>
      </Col>

      <Col xs={6}>
        <Row className=" justify-content">
          <Col className=" pt-5 justify-content-md-center">
            <div className=" mb-5">
              <AiFillLinkedin size={30} color="blue" />
              {data.linkedin}
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
        </Row>
      </Col>
    </Row>
  );
};

export default CVPersonalInfo;
