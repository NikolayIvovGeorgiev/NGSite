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
  Settings,
  iPersonalInfoData,
} from "../../../entities/cvInterfaces";
import { createElement, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import IconModal from "../../shared/modals/IconModal";
import { cloneDeep } from "lodash";

interface Props {
  settings: Settings;
  data: PersonalDataInfo;
  onSave: (data?: PersonalDataInfo) => void;
}

const CVPersonalInfoModify = ({ data, onSave, settings }: Props) => {
  const [personalInfoData, setPersonalInfoData] = useState(cloneDeep(data));
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
    const updatedFields = [...personalInfoData.fields];

    if (key === "icon" || key === "type" || key === "value")
      updatedFields[index][key] = value;

    setPersonalInfoData({
      ...personalInfoData,
      fields: updatedFields,
    });
  };
  const updateSummaryField = (value: string) => {
    const updatedSummary = value;

    setPersonalInfoData({
      ...personalInfoData,
      summary: updatedSummary,
    });

    console.log();
  };

  const handleFieldTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newType = e.target.value;
    let updatedFields = [...personalInfoData.fields];
    updatedFields[index].type = newType;

    if (newType === "date") {
      updatedFields[index].value = "";
    }

    setPersonalInfoData({
      ...personalInfoData,
      fields: updatedFields,
    });
  };

  const handleAddNewField = () => {
    const newField = { icon: "", type: "", value: "" };

    setPersonalInfoData({
      ...personalInfoData,
      fields: [...personalInfoData.fields, newField],
    });
  };

  const handleRemoveField = (index: number) => {
    const editedContent = [...personalInfoData.fields];
    editedContent.splice(index, 1);
    setPersonalInfoData({
      ...personalInfoData,
      fields: editedContent,
    });
  };

  const handleIconChoice = (icon: string | undefined, index: number) => {
    const updatedFields = [...personalInfoData.fields];

    updatedFields[index].icon = icon;
    setPersonalInfoData({
      ...personalInfoData,
      fields: updatedFields,
    });
  };

  return (
    <>
      <Row>
        {/*PHOTO*/}
        <Col xs={2}>
          <Image
            //fluid
            className="shadow w-100"
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
        <Col xs={10}>
          <Row className="d-flex justify-content-center align-items-center">
            {/*NAME*/}
            <InputGroup>
              <Form.Control
                className="shadow mb-2"
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
                  <InputGroup
                    className="mb-2"
                    key={`${personalInfoData.name} + ${index}`}
                  >
                    <Form.Group
                      id={`${personalInfoData.name} + ${
                        personalInfoData.fields.length
                      } + ${index + 1} `}
                      as={Row}
                      className="w-100 justify-content-center"
                    >
                      <Col xs={2} className="align-self-center">
                        <select
                          className="custom-select text-md-center"
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
                      </Col>
                      <Col>
                        <IconModal
                          settings={settings}
                          defaultIcon={personalInfoField.icon}
                          OnSave={(icon) => handleIconChoice(icon, index)}
                        />
                      </Col>
                      {/*Value*/}
                      <Col xs={5}>
                        {personalInfoField.type === "date" && (
                          <Form.Group
                            id={`${data.name} + ${personalInfoField.type} + ${index} `}
                          >
                            <Form.Control
                              aria-label="Description"
                              value={personalInfoField.value}
                              type="month"
                              name="startDate"
                              required
                              onChange={(e) => {
                                updateInputField(
                                  index,
                                  "value",
                                  e.target.value
                                );
                              }}
                            ></Form.Control>
                          </Form.Group>
                        )}

                        {personalInfoField.type !== "date" && (
                          <>
                            <Form.Control
                              aria-label="personalInfoField-value"
                              value={personalInfoField.value}
                              type="string"
                              as="input"
                              name="value"
                              onChange={(e) => {
                                updateInputField(
                                  index,
                                  "value",
                                  e.target.value
                                );
                              }}
                            />
                          </>
                        )}
                      </Col>
                      {/*Remove Field*/}
                      <Col xs={1}>
                        <ImCross
                          className="justify"
                          style={{
                            cursor: "pointer",
                            color: `${settings.colorTheme?.accent}`,
                          }}
                          onClick={() => handleRemoveField(index)}
                        />
                      </Col>
                    </Form.Group>
                  </InputGroup>
                );
              }
            )}
          <div className="flex mb-3">
            <Button
              variant="primary"
              onClick={() => {
                handleAddNewField();
              }}
            >
              Add Field
            </Button>
          </div>
          {personalInfoData.summary !== null && (
            <>
              <div className="flex">
                <textarea
                  rows={3}
                  className="w-75 ms-5"
                  value={personalInfoData.summary}
                  onChange={(e) => {
                    updateSummaryField(e.target.value);
                  }}
                />
              </div>
              <div className="flex">
                <Button
                  variant="primary"
                  onClick={() => {
                    setPersonalInfoData({
                      ...personalInfoData,
                      summary: null,
                    });
                  }}
                >
                  Delete Summary
                </Button>
              </div>
            </>
          )}
          {personalInfoData.summary == null && (
            <>
              <div className="flex">
                <Button
                  variant="primary"
                  onClick={() => {
                    setPersonalInfoData({
                      ...personalInfoData,
                      summary: "",
                    });
                  }}
                >
                  Add Summary
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="btn btn-accent float-end  m-2"
          onClick={() => {
            onSave();
          }}
        >
          {" "}
          Cancel Edit
        </Button>

        <Button
          className="btn btn-accent float-end m-2"
          onClick={() => {
            onSave(personalInfoData);
          }}
        >
          {" "}
          Save Section
        </Button>
      </div>
    </>
  );
};

export default CVPersonalInfoModify;
