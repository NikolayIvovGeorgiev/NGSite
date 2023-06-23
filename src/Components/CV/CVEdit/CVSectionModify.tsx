import React, { useState } from "react";
import {
  Section,
  iPieChartComponentData,
  iProgressBarComponentData,
  iTextFieldComponentData,
} from "../../../entities/cvInterfaces";
import { Button, Row, Col, Placeholder } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ImCross } from "react-icons/im";
import { TEXT_SECTION_OPTIONAL_FIELDS as optionalFields } from "../constants";
import { get } from "lodash";

interface Props {
  data: Section;
  heading: string;
  index: number;
  // children?: ReactNode;
  // // position: {
  //   col: string | number;
  //   index: number;
  // };
  onSave: (sectionData: Section) => void;
}

const CVSectionModify = ({ data, index, heading, onSave }: Props) => {
  /**
   * SET TYPES OF THE DATA IN EDIT, FOR ALREADY EXISTING DATA
   * RETRUN DEFAULT VALUES
   * @return {*}
   */
  const setInitialToggleButtons = () => {
    let defaultValues: string[] = [];
    if (data.type === "Text-field") {
      const hasDescription = data.data.content?.some(
        (chapter: iTextFieldComponentData) => !!chapter.description
      );
      if (hasDescription) defaultValues.push(optionalFields.description);

      const hasDates = data.data.content?.some(
        (chapter: iTextFieldComponentData) =>
          !!(chapter.startDate || chapter.endDate)
      );
      if (hasDates) defaultValues.push(optionalFields.date);

      const hasList = data.data.content?.some(
        (chapter: iTextFieldComponentData) => !!chapter.list
      );
      if (hasList) defaultValues.push(optionalFields.list);
    }

    return defaultValues;
  };

  const [togglesValue, setTogglesValue] = useState<string[]>(
    setInitialToggleButtons()
  );
  const [sectionData, setSectionData] = useState<any>(data);
  const [validated, setValidated] = useState(false);
  const [chosenSectionType, setChosenSectionType] = useState(sectionData.type);
  /**
 *ADDING NEW COMPONENT TYPE TO THE SECTION IN RIGHT FORMAT
       iProgressBarComponentData OR
       iTextFieldComponentData OR
       iPieChartComponentData    
 *
 * @param {string} chosenSectionType
 */
  const handleAddContent = (chosenSectionType: string) => {
    let newData:
      | iProgressBarComponentData
      | iTextFieldComponentData
      | iPieChartComponentData = {};
    if (chosenSectionType === "Text-field")
      newData = { title: "", subtitle: "" };
    if (chosenSectionType === "Progress-bar")
      newData = { title: "", level: undefined };
    if (chosenSectionType === "Pie-Chart") newData = {};

    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        content: [...sectionData.data.content, newData],
      },
    });
  };

  const handleRemove = (index: number, path?: string, listIndex?: number) => {
    const newContent = sectionData.data.content;
    console.log(path, listIndex);

    if (path && listIndex !== undefined) {
      console.log("1");

      //: handleRemoveSubcomponent(0, 'shoppingCart.list', 2) LODASH handling depth
      get(newContent[index], path).splice(listIndex, 1);
    } else {
      newContent.splice(index, 1);
    }
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        content: newContent,
      },
    });
  };
  const inputFieldOnChange = (
    index: number,
    field: string,
    value: any,
    listIndex?: number
  ) => {
    const updatedContent = [...sectionData.data.content];

    if (field === "list" && listIndex !== undefined) {
      updatedContent[index][field][listIndex] = value;
    } else {
      updatedContent[index][field] = value;
    }

    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        content: updatedContent,
      },
    });
  };

  /**
   * Handles the dropdown change for components
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleComponentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChosenSectionType(e.target.value);
    setSectionData({
      ...sectionData,
      type: e.target.value,
      data: {
        ...sectionData,
        content: [],
      },
    });
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const handleAddListItem = (index: number) => {
    if (!!sectionData.data.content[index].list) {
      let content = [...sectionData.data.content];
      content[index].list.push("");

      setSectionData({
        ...sectionData,
        data: {
          ...sectionData.data,
          content: content,
        },
      });
      console.log(sectionData);
    }
  };
  const handleChangeButton = (val: any) => {
    setTogglesValue(val);

    const newlist = [""];

    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        content: sectionData.data.content.map(
          (dataObject: iTextFieldComponentData) => ({
            ...dataObject,
            list: newlist,
          })
        ),
      },
    });
  };
  const sanitzeSection = () => {
    console.log(togglesValue);

    if (!togglesValue.includes(optionalFields.description)) {
      let updatedContent = sectionData.data.content;
      updatedContent.map((chapter: any) => {
        if (chapter.hasOwnProperty("description"))
          delete chapter["description"];
        return chapter;
      });
      setSectionData({
        ...sectionData,
        data: {
          ...sectionData.data,
          content: updatedContent,
        },
      });
    }
    if (!togglesValue.includes(optionalFields.list)) {
      const updatedContent = sectionData.data.content.map((chapter: any) => {
        if (chapter.hasOwnProperty("list")) {
          delete chapter["list"];
          return chapter;
        }
      });
      setSectionData({
        ...sectionData,
        data: {
          ...sectionData.data,
          content: updatedContent,
        },
      });
    }
    if (!togglesValue.includes(optionalFields.date)) {
      const updatedContent = sectionData.data.content.map((chapter: any) => {
        if (chapter.hasOwnProperty("date")) {
          delete chapter["date"];
          return chapter;
        }
      });
      setSectionData({
        ...sectionData,
        data: {
          ...sectionData.data,
          content: updatedContent,
        },
      });
    }
  };

  return (
    <div className="border-gradient-title m-0 p-2">
      <Row>
        {/* SECTION TITLE */}
        <Col xs={10}>
          <InputGroup>
            <Form.Control
              size="lg"
              value={sectionData.title}
              aria-label={heading}
              aria-describedby="NewTitleSection"
              onChange={(e) => {
                setSectionData({
                  ...sectionData,
                  title: e.target.value,
                });
              }}
            />
          </InputGroup>
          <Form.Text className="text-accent p-2"> Section Title</Form.Text>
        </Col>
        <Col xs={2}>
          {/* DELETE SECTION / SHOULD BE KEBAB */}
          <Button
            size="sm"
            className="btn btn-accent float-end"
            onClick={() => {}}
          >
            {" "}
            Delete Section
          </Button>
        </Col>
      </Row>
      <br></br>
      <div className="border-gradient-body p-2">
        {/* DROPDOWN SECTION TYPE */}
        <select
          className="custom-select w-100 text-md-center mb-1"
          id="SubcomponentDropDown"
          defaultValue={chosenSectionType}
          onChange={handleComponentTypeChange}
        >
          <option value="" disabled hidden>
            Component Type
          </option>
          <option value="Text-field">Text Field</option>
          <option value="Progress-bar">Progress Bar</option>
          <option value="Pie-Chart">Pie Chart</option>
        </select>
        {/* IF Text-field TYPE */}
        {chosenSectionType === "Text-field" && (
          <Form>
            {/* Toggle buttons */}
            <ToggleButtonGroup
              className=" d-flex justify-content-between border"
              size="sm"
              type="checkbox"
              value={togglesValue}
              onChange={handleChangeButton}
            >
              <ToggleButton
                variant="outline-accent"
                id="tbg-btn-1"
                value={"list"}
              >
                List
              </ToggleButton>
              <ToggleButton
                variant="outline-accent"
                id="tbg-btn-2"
                value={"description"}
              >
                Description
              </ToggleButton>
              <ToggleButton
                variant="outline-accent"
                id="tbg-btn-3"
                value={"dates"}
              >
                Date
              </ToggleButton>
            </ToggleButtonGroup>
            <Placeholder size="sm" className="mb-1" xs={12} bg="accent" />
            {/* Sections Foreach */}
            {sectionData.data.content?.map(
              (textField: iTextFieldComponentData, index: number) => {
                return (
                  <InputGroup key={`${index}`}>
                    {/* Title */}
                    <Row className="w-100">
                      <Form.Group
                        id={`${sectionData.id} + ${textField.title} + ${index} `}
                      >
                        <Form.Control
                          aria-label="Title"
                          value={textField.title}
                          type="text"
                          name="Title"
                          onChange={(e) => {
                            inputFieldOnChange(index, "title", e.target.value);
                          }}
                          placeholder="Title"
                        />
                        <Form.Text className="text-accent">
                          Text Title
                        </Form.Text>
                      </Form.Group>
                    </Row>
                    {/* Subtitle */}
                    <Row className="w-100">
                      <Form.Group
                        id={`${sectionData.id} + ${textField.subtitle} + ${index} `}
                      >
                        <Form.Control
                          aria-label="Subtitle"
                          value={textField.subtitle}
                          type="string"
                          name="Subtitle"
                          required
                          onChange={(e) => {
                            inputFieldOnChange(
                              index,
                              "subtitle",
                              e.target.value
                            );
                          }}
                          placeholder="Subtitle"
                        />
                        <Form.Text className="text-accent">Subtitle</Form.Text>
                      </Form.Group>
                    </Row>
                    {/* IF DESCRIPTION */}
                    {togglesValue.includes("description") && (
                      <Row className="w-100">
                        <Form.Group
                          id={`${sectionData.id} + ${textField.subtitle} + ${index} `}
                        >
                          <Form.Control
                            aria-label="Description"
                            value={textField.description}
                            type="string"
                            as="textarea"
                            name="Description"
                            required
                            onChange={(e) => {
                              inputFieldOnChange(
                                index,
                                "description",
                                e.target.value
                              );
                            }}
                            placeholder="Description"
                          />
                          <Form.Text className="text-accent ">
                            Description
                          </Form.Text>
                        </Form.Group>
                      </Row>
                    )}
                    {/* IF LISTS */}
                    {togglesValue.includes("list") && (
                      <>
                        {textField?.list &&
                          textField.list?.map(
                            (listElement: string, listIndex: number) => {
                              return (
                                <InputGroup
                                  key={`${sectionData.id} + ${textField.title}+${listIndex}`}
                                >
                                  <Row className="w-100">
                                    <Form.Text className="text-accent ">
                                      List Element
                                    </Form.Text>
                                    <Row className="w-100">
                                      <Form.Group
                                        as={Col}
                                        xs={11}
                                        id={`${sectionData.id} + ${
                                          listElement.length
                                        } + ${listIndex + 1} `}
                                      >
                                        <Form.Control
                                          aria-label="list"
                                          value={listElement}
                                          type="string"
                                          as="input"
                                          name="List Element"
                                          required
                                          onChange={(e) => {
                                            inputFieldOnChange(
                                              index,
                                              "list",
                                              e.target.value,
                                              listIndex
                                            );
                                          }}
                                          placeholder="List Item"
                                        />
                                      </Form.Group>
                                    </Row>
                                    <Col xs={1}>
                                      <ImCross
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleRemove(index, "list", listIndex)
                                        }
                                      />
                                    </Col>
                                  </Row>
                                </InputGroup>
                              );
                            }
                          )}

                        <Button
                          className="justify"
                          variant="primary"
                          onClick={() => handleAddListItem(index)}
                        >
                          Add List Item
                        </Button>
                      </>
                    )}
                    {/* IF DATES */}
                    {togglesValue.includes("dates") && (
                      <Row className="w-100">
                        {/* Start Date FORM */}
                        <Col xs={6}>
                          <Form.Group
                            id={`${sectionData.id} + ${textField.startDate} + ${index} `}
                          >
                            <Form.Control
                              aria-label="Description"
                              value={textField.startDate}
                              type="month"
                              name="startDate"
                              required
                              onChange={(e) => {
                                inputFieldOnChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                );
                              }}
                            />
                            <Form.Text className="text-accent">
                              Start Date
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        {/* END Date FORM */}
                        <Col xs={6}>
                          <Form.Group
                            id={`${sectionData.id} + ${textField.endDate} + ${index} `}
                          >
                            <Form.Control
                              aria-label="Description"
                              value={textField.endDate}
                              type="month"
                              name="endDate"
                              required
                              onChange={(e) => {
                                inputFieldOnChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                );
                              }}
                            />
                            <Form.Text className="text-accent">
                              End Date
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    {/* Remove Text Field */}
                    <Button
                      variant="primary"
                      onClick={() => handleRemove(index)}
                    >
                      Remove Text Field
                    </Button>
                    <Placeholder
                      size="sm"
                      className="m-1"
                      xs={12}
                      bg="secondary"
                    />
                  </InputGroup>
                );
              }
            )}
            {/* NEW TEXT FIELD */}
            <Button
              variant="primary"
              onClick={() => handleAddContent(chosenSectionType)}
            >
              Add Text Field
            </Button>
          </Form>
        )}
        {/* IF PROGRESS-BAR TYPE */}
        {chosenSectionType === "Progress-bar" && (
          <Form noValidate validated={validated} onChange={handleSubmit}>
            {sectionData.data.content?.map(
              (
                progressBarSection: iProgressBarComponentData,
                index: number
              ) => {
                return (
                  <InputGroup key={`${index}`}>
                    <Row className="g-3">
                      <Form.Group
                        as={Col}
                        xs={7}
                        id={`${sectionData.id} + ${progressBarSection.title} + ${index} `}
                      >
                        <Form.Control
                          aria-label="Skill"
                          value={progressBarSection.title}
                          type="text"
                          name="Skill"
                          required
                          // onChange={handleSubmit}
                          onChange={(e) => {
                            inputFieldOnChange(index, "title", e.target.value);
                          }}
                          placeholder="Skill"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={4}
                        id={`${sectionData.id} + ${progressBarSection.level} + ${index} `}
                      >
                        <Form.Control
                          aria-label="Level"
                          value={progressBarSection.level}
                          type="number"
                          min={0}
                          max={10}
                          name="Skill"
                          required
                          onChange={(e) => {
                            inputFieldOnChange(index, "level", e.target.value);
                          }}
                          placeholder="max 10"
                        />
                        <Form.Control.Feedback type="invalid">
                          level should be between 1-10
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Col xs={1}>
                        <ImCross
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemove(index)}
                        />
                      </Col>
                    </Row>
                  </InputGroup>
                );
              }
            )}
            <Button
              variant="primary"
              onClick={() => handleAddContent(chosenSectionType)}
            >
              Add Skill
            </Button>
          </Form>
        )}
        {/* IF Pie-Chart TYPE */}
        {chosenSectionType === "Pie-Chart" && (
          <Form noValidate validated={validated} onChange={handleSubmit}>
            {sectionData.data.content?.map(
              (pieChartSection: iPieChartComponentData, index: number) => {
                return (
                  <InputGroup key={`${index}`}>
                    <Row className="g-3">
                      <Form.Group
                        as={Col}
                        xs={7}
                        id={`${sectionData.id} + ${pieChartSection.title} + ${index} `}
                      >
                        <Form.Control
                          aria-label="Skill"
                          value={pieChartSection.title}
                          type="text"
                          name="title"
                          required
                          // onChange={handleSubmit}
                          onChange={(e) => {
                            inputFieldOnChange(index, "title", e.target.value);
                          }}
                          placeholder="title"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={4}
                        id={`${sectionData.id} + ${pieChartSection.percent} + ${index} `}
                      >
                        <Form.Control
                          aria-label="Level"
                          value={pieChartSection.percent}
                          type="number"
                          min={0}
                          name="Skill"
                          required
                          onChange={(e) => {
                            inputFieldOnChange(
                              index,
                              "percent",
                              e.target.value
                            );
                          }}
                        />
                      </Form.Group>
                      <Col xs={1}>
                        <ImCross
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemove(index)}
                        />
                      </Col>
                    </Row>
                  </InputGroup>
                );
              }
            )}
            <Button
              variant="primary"
              onClick={() => handleAddContent(chosenSectionType)}
            >
              Add Skill
            </Button>
          </Form>
        )}
        {/* SAVE SECTION + SANITIZE SECTION + STATE-OLD */}
        <Button
          className="btn btn-accent float-end"
          onClick={() => {
            sectionData.state = "old";
            sanitzeSection();
            onSave(sectionData);
          }}
        >
          {" "}
          Save Section
        </Button>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};
export default CVSectionModify;
