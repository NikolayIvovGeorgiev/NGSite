import { Row, Image, Button, Form, InputGroup, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import IconModal from "../../shared/modals/IconModal";
import { cloneDeep } from "lodash";
import { iCv, iPersonalInfoFields } from "../../../entities/cvInterfaces";

interface Props {
  data: iCv;
}

const CVPersonalInfoModify = ({ data }: Props) => {
  const [cvData, setCvData] = useState(data);
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
    const updatedFields = [...cvData.personalInfoFields];

    if (key === "icon" || key === "type" || key === "value")
      updatedFields[index][key] = value;

    setCvData({
      ...cvData,
      personalInfoFields: updatedFields
    });
  };
  const updateSummaryField = (value: string) => {
    const updatedSummary = value;

    setCvData({
      ...cvData,
        summary: updatedSummary,
    });
  };

  const handleFieldTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newType = e.target.value;
    let updatedFields = [...cvData.personalInfoFields];
    updatedFields[index].type = newType;

    if (newType === "date") {
      updatedFields[index].value = "";
    }

    setCvData({
      ...cvData,
      personalInfoFields: updatedFields
    });
  };

  const handleAddNewField = () => {
    const newField = { icon: "", type: "", value: "" };

    setCvData({
      ...cvData,
      personalInfoFields: [...cvData.personalInfoFields, newField]
    });
  };

  const handleRemoveField = (index: number) => {
    const editedContent = [...cvData.personalInfoFields];
    editedContent.splice(index, 1);
    setCvData({
      ...cvData,
      personalInfoFields: editedContent
    });
  };

  const handleIconChoice = (icon: string | undefined, index: number) => {
    const updatedFields = [...cvData.personalInfoFields];

    updatedFields[index].icon = icon;
    setCvData({
      ...cvData,
        personalInfoFields: updatedFields
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
                value={cvData.cvName || ""}
                onChange={(e) => {
                  setCvData({
                    ...cvData,
                    cvName:  e.target.value
                  });
                  console.log(cvData);
                }}
              />
            </InputGroup>
          </div>
          {cvData?.personalInfoFields &&
            cvData.personalInfoFields.map(
              (personalInfoField: iPersonalInfoFields, index: number) => {
                return (
                  // display: grid;
                  // grid-template-columns: auto auto 1fr auto;
                  // grid-gap: 1rem;

                  <InputGroup
                    className="d-grid"
                    key={`${cvData.cvName} + ${index}`}
                  >
                    <Form.Group
                      className=" d-grid grid align-items-center mb-2"
                      id={`${cvData.cvName} + ${
                        cvData.personalInfoFields.length
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
                          defaultIcon={personalInfoField.icon}
                          OnSave={(icon) => handleIconChoice(icon, index)}
                        />
                      </div>
                      {/*Value*/}
                      <div className=" align-self-center me-2">
                        {personalInfoField.type === "date" && (
                          <Form.Group
                            id={`${data.cvName} + ${personalInfoField.type} + ${index} `}
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
          {cvData.summary !== null && (
            <>
              <div className="flex mb-2">
                <textarea
                  rows={3}
                  className="w-100 rounded"
                  value={cvData.summary}
                  onChange={(e) => {
                    updateSummaryField(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-end mb-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    setCvData({
                      ...cvData,
                      summary: ''
                    });
                  }}
                >
                  Delete Summary
                </Button>
              </div>
            </>
          )}
          {cvData.summary == null && (
            <>
              <div className="d-flex justify-content-end mb-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    setCvData({
                      ...cvData,
                      summary: ''
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
