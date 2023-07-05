import {
  Row,
  Image,
  Button,
  Placeholder,
  Form,
  InputGroup,
  Col,
} from "react-bootstrap";
import {
  PersonalDataInfo,
  iPersonalInfoData,
} from "../../../entities/cvInterfaces";
import { useState } from "react";
import { ImCross } from "react-icons/im";

interface Props {
  data: PersonalDataInfo;
}

const CVPersonalIfnoMOdify = ({ data }: Props) => {
  const [personalInfoData, setPersonalInfoData] = useState(data);
  const [selectedfile, setSelectedFile] = useState(null);

  let [displayPicture, setDisplayPicture] = useState("/src/assets/noimage.jpg");

  const updatePicture = () => {
    if (selectedfile !== null) {
      setDisplayPicture(URL.createObjectURL(selectedfile));
    }
  };
  const fileSelectedHandler = (event: any) => {
    setSelectedFile(event?.target.files[0]);
  };
  const fileUploadHandler = () => {
    // Upload picture to server
  };

  const updateInputField = (index: number, key: string, value: string) => {
    const updatedFields = [...data.fields];

    if (key === "icon" || key === "type" || key === "value")
      updatedFields[index][key] = value;
    setPersonalInfoData({
      ...personalInfoData,
      fields: updatedFields,
    });
  };
  const handleFieldTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newType = e.target.value;
    let updatedFields = [...personalInfoData.fields];
    updatedFields[index].type = newType;

    setPersonalInfoData({
      ...personalInfoData,
      fields: updatedFields,
    });
    console.log(personalInfoData);
  };

  return (
    <>
      <Row>
        {/*PHOTO*/}
        <Col xs={2}>
          <Image
            //fluid
            className="shadow m-2 fixed-size"
            src={displayPicture}
          ></Image>
          <div>
            <label> Select Image</label>
            <input type="file" accept="Image" onChange={fileSelectedHandler} />
            <Button
              className="btn btn-accent"
              onClick={() => {
                fileUploadHandler(), updatePicture();
              }}
            >
              Upload
            </Button>
          </div>
        </Col>
        <Col xs={9}>
          <Row className="d-flex justify-content-center align-items-center pt-2 pe-5">
            {/*NAME*/}
            <Form.Text className=" text-accent"> Name</Form.Text>
            <InputGroup>
              <Form.Control
                className="shadow"
                size="lg"
                value={personalInfoData.name}
                onChange={(e) => {
                  setPersonalInfoData({
                    ...personalInfoData,
                    name: e.target.value,
                  });
                }}
              />
            </InputGroup>
          </Row>
          {personalInfoData?.fields &&
            personalInfoData.fields?.map(
              (personalInfoField: iPersonalInfoData, index: number) => {
                return (
                  <InputGroup key={`${personalInfoData.name} + ${index}`}>
                    <Form.Group
                      id={`${personalInfoData.name} + ${
                        personalInfoData.fields.length
                      } + ${index + 1} `}
                      as={Row}
                      className="w-100"
                    >
                      {/*Description*/}
                      <Col xs={2}>
                        <select
                          className="custom-select text-md-center mb-1"
                          id="FieldTypeDropDown"
                          defaultValue={personalInfoField.type}
                          onChange={(e) => {
                            handleFieldTypeChange(e, index);
                          }}
                        >
                          <option value="link">Link</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="date">Date</option>
                          <option value="text">Text</option>
                        </select>
                        {/* <Form.Text className="text-accent">
                          Description
                        </Form.Text>
                        <Form.Control
                          aria-label="personalInfoField-description"
                          value={personalInfoField.description}
                          type="string"
                          as="input"
                          name="description"
                          onChange={(e) => {
                            updateInputField(
                              index,
                              "description",
                              e.target.value
                            );
                          }}
                        /> */}
                      </Col>
                      {/*Value*/}
                      <Col xs={5}>
                        <Form.Text className="text-accent">Value</Form.Text>
                        <Form.Control
                          aria-label="personalInfoField-value"
                          value={personalInfoField.value}
                          type="string"
                          as="input"
                          name="value"
                          onChange={(e) => {
                            updateInputField(index, "value", e.target.value);
                          }}
                        />
                      </Col>
                      {/*Remove Field*/}
                      <Col xs={1}>
                        <ImCross
                          className="justify"
                          style={{ cursor: "pointer" }}

                          // onClick={() =>
                          //   handleRemove(index, "list", listIndex)
                          // }
                        />
                      </Col>
                    </Form.Group>
                  </InputGroup>
                );
              }
            )}
          <Button variant="primary" onClick={() => console.log(1)}>
            Add Field
          </Button>
        </Col>
      </Row>

      <Button className="btn btn-accent float-end" onClick={() => {}}>
        {" "}
        Save Section
      </Button>
      <Placeholder size="sm" className="mb-1" xs={12} bg="accent" />
    </>
  );
};

export default CVPersonalIfnoMOdify;
