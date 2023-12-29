import { Row, Image, Button, Form, InputGroup, Col } from "react-bootstrap";
import {
  CVInterface,
  PersonalDataInfo,
  Settings,
  iPersonalInfoFields,
} from "../../../entities/cvInterfaces_old";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import IconModal from "../../shared/modals/IconModal";
import { cloneDeep } from "lodash";

interface Props {
  settings: Settings;
  data: CVInterface;
  onSave: (data?: CVInterface) => void;
}

const CVPersonalInfoModify = ({ data, onSave, settings }: Props) => {
  const [personalInfoData, setPersonalInfoData] = useState(cloneDeep(data));
  let [displayPicture, setDisplayPicture] = useState(
    data.image ? data.image : "/src/assets/noimage.jpg"
  );

  const fileSelectedHandler = (event: any) => {
    setDisplayPicture(URL.createObjectURL(event?.target.files[0]));
    fileUploadHandler(); // Upload to server when ready
  };

  const fileUploadHandler = () => {
    // Upload picture to server
  };

  const updateInputField = (index: number, key: string, value: string) => {
    const updatedFields = [...personalInfoData.personalInfoFields];

    if (key === "icon" || key === "type" || key === "value")
      updatedFields[index][key] = value;

    setPersonalInfoData({
      ...personalInfoData,
      personalInfoFields: updatedFields,
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
    let updatedFields = [...personalInfoData.personalInfoFields];
    updatedFields[index].type = newType;

    if (newType === "date") {
      updatedFields[index].value = "";
    }

    setPersonalInfoData({
      ...personalInfoData,
      personalInfoFields: updatedFields,
    });
  };

  const handleAddNewField = () => {
    const newField = { icon: "", type: "", value: "" };

    setPersonalInfoData({
      ...personalInfoData,
      personalInfoFields: [...personalInfoData.personalInfoFields, newField],
    });
  };

  const handleRemoveField = (index: number) => {
    const editedContent = [...personalInfoData.personalInfoFields];
    editedContent.splice(index, 1);
    setPersonalInfoData({
      ...personalInfoData,
      personalInfoFields: editedContent,
    });
  };

  const handleIconChoice = (icon: string | undefined, index: number) => {
    const updatedFields = [...personalInfoData.personalInfoFields];

    updatedFields[index].icon = icon;
    setPersonalInfoData({
      ...personalInfoData,
      personalInfoFields: updatedFields,
    });
  };

  useEffect(() => {});

  return (
    <>
      <Row>
        {/*PHOTO*/}
        <Col xs={3} className="position-relative">
          <Image
            //fluid
            className="shadow w-100"
            src={displayPicture}
          ></Image>
          <div className="position-absolute top-0 bottom-0 start-0 end-0 p-inherit">
            <label
              htmlFor="profilePhoto"
              className="w-100 h-100 c-pointer d-flex align-items-center justify-content-center"
            >
              {" "}
              <span className="fs-4 fw-bold p-4 text-center">
                Upload profile photo
              </span>
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="Image"
              className="d-none"
              onChange={fileSelectedHandler}
            />
          </div>
        </Col>
        <Col xs={9}>
          <div className="d-flex align-items-center justify-content-between">
            {/*NAME*/}
            <InputGroup>
              <Form.Control
                className="shadow mb-4"
                size="lg"
                value={personalInfoData.cvName || ""}
                onChange={(e) => {
                  setPersonalInfoData({
                    ...personalInfoData,
                    cvName: e.target.value,
                  });
                  console.log(personalInfoData);
                }}
              />
            </InputGroup>
          </div>
          {personalInfoData?.personalInfoFields &&
            personalInfoData.personalInfoFields?.map(
              (personalInfoField: iPersonalInfoFields, index: number) => {
                return (
                  // display: grid;
                  // grid-template-columns: auto auto 1fr auto;
                  // grid-gap: 1rem;

                  <InputGroup
                    className="d-grid"
                    key={`${personalInfoData.name} + ${index}`}
                  >
                    <Form.Group
                      className=" d-grid grid align-items-center mb-2"
                      id={`${personalInfoData.name} + ${
                        personalInfoData.personalInfoFields.length
                      } + ${index + 1} `}
                    >
                      <div className=" align-self-center me-2">
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
                      </div>
                      <div className=" align-self-center me-2">
                        <IconModal
                          settings={settings}
                          defaultIcon={personalInfoField.icon}
                          OnSave={(icon) => handleIconChoice(icon, index)}
                        />
                      </div>
                      {/*Value*/}
                      <div className=" align-self-center me-2">
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
                      </div>
                      {/*Remove Field*/}
                      <div className="">
                        <ImCross
                          // style={{
                          //   color: `${settings.colorTheme?.accent}`,
                          // }}
                          className="v-align-unset c-pointer"
                          onClick={() => handleRemoveField(index)}
                        />
                      </div>
                    </Form.Group>
                  </InputGroup>
                );
              }
            )}
          <div className="d-flex justify-content-end mb-4">
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
              <div className="flex mb-2">
                <textarea
                  rows={3}
                  className="w-100 rounded"
                  value={personalInfoData.summary}
                  onChange={(e) => {
                    updateSummaryField(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-end mb-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    setPersonalInfoData({
                      ...personalInfoData,
                      summary: "",
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
              <div className="d-flex justify-content-end mb-4">
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
      {/* <div className="d-flex justify-content-end mb-4">
        <Button
          className="btn btn-accent me-2 mb-4"
          onClick={() => {
            onSave();
          }}
        >
          {" "}
          Cancel Edit
        </Button>

        <Button
          className="btn btn-accent mb-4"
          onClick={() => {
            onSave(personalInfoData);
          }}
        >
          {" "}
          Save Section
        </Button>
      </div> */}
    </>
  );
};

export default CVPersonalInfoModify;
