import React, { useState } from "react";
import {
  Section,
  Settings,
  iPieChartComponentData,
  iProgressBarComponentData,
  iTextFieldComponentData,
} from "../../../entities/cvInterfaces_old";
import { Button, Row, Col } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ImCross } from "react-icons/im";
import { TEXT_SECTION_OPTIONAL_FIELDS as optionalFields } from "../constants";
import { cloneDeep, get } from "lodash";
import { iSection } from "../../../entities/cvInterfaces";
// import SectionDeleteButton from "./SectionDeleteModal";
// import { color } from "chart.js/helpers";

interface Props {
  data: iSection;
  heading: string;
  // index: number;
  // children?: ReactNode;
  // // position: {
  //   col: string | number;
  //   index: number;
  // };
  onSave: (sectionData?: iSection) => void;
  onDelete: () => void;
}

const CVSectionModify = ({
  data,
  heading,
  onSave,
  onDelete,
}: Props) => {
  /**
   * SET TYPES OF THE DATA IN EDIT, FOR ALREADY EXISTING DATA
   * RETRUN DEFAULT VALUES
   * @return {*}
   */
  const setInitialToggleButtons = () => {
    let defaultValues: string[] = [];
    if (data.payload.type === "Text-field")  {
      // const hasDescription = data.payload.content?.some(
      //   (chapter: iTextFieldComponentData) => !!chapter.description
      // );
      if (data.payload.content?.hasOwnProperty('description')) 
        defaultValues.push(optionalFields.description);

      // const hasDates = data.payload.content?.some(
      //   (chapter: iTextFieldComponentData) =>
      //     !!(chapter.startDate || chapter.endDate)
      // );
      if (data.payload.content?.hasOwnProperty('startDate') || data.payload.content?.hasOwnProperty('endDate'))
        defaultValues.push(optionalFields.date);

      // const hasList = data.payload.content?.some(
      //   (chapter: iTextFieldComponentData) => !!chapter.list
      // );
      if (data.payload.content?.hasOwnProperty('hasList')) 
        defaultValues.push(optionalFields.list);
    }

    return defaultValues;
  };

  const [togglesValue, setTogglesValue] = useState<string[]>(
    setInitialToggleButtons()
  );
  const [sectionData, setSectionData] = useState<any>(cloneDeep(data));
  const [validated, setValidated] = useState(false);
  const [chosenSectionType, setChosenSectionType] = useState(sectionData.payload.type);
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
    if (chosenSectionType === "Text-field") {
      newData = { title: "", subtitle: "" };
      if (togglesValue.includes("list")) newData.list = [""];
    }
    if (chosenSectionType === "Progress-bar")
      newData = { title: "", level: undefined };
    if (chosenSectionType === "Pie-Chart") 
      newData = { title: "", percent: "" };

    setSectionData({
      ...sectionData,
      payload: {
        ...sectionData.payload,
        content: [...sectionData.payload.content, newData],
      },
    });
  };

  const handleRemove = (index: number, path?: string, listIndex?: number) => {
    const newContent = sectionData.payload.content;

    if (path && listIndex !== undefined) {
      console.log("1");

      //: handleRemoveSubcomponent(0, 'shoppingCart.list', 2) LODASH handling depth
      get(newContent[index], path).splice(listIndex, 1);
    } else {
      newContent.splice(index, 1);
    }
    setSectionData({
      ...sectionData,
      payload: {
        ...sectionData.payload,
        content: newContent,
      },
    });
  };
  const inputFieldOnChange = (
    index: number,
    property: string,
    value: any,
    listIndex?: number
  ) => {
    const updatedContent = [...sectionData.payload.content];

    if (property === "list" && listIndex !== undefined) {
      updatedContent[index][property][listIndex] = value;
    } else {
      updatedContent[index][property] = value;
    }

    setSectionData({
      ...sectionData,
      payload: {
        ...sectionData.payload,
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
      payload: {
        ...sectionData.payload,
        type: e.target.value,
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
    console.log("called");

    if (!!sectionData.payload.content[index].list) {
      let content = cloneDeep(sectionData.payload.content);
      content[index].list = [...content[index].list, ""];
      setSectionData({
        ...sectionData,
        payload: {
          ...sectionData.payload,
          content: content,
        },
      });
    }
  };
  const handleChangeButton = (newToggleValues: any) => {
    const oldToggleValues = cloneDeep(togglesValue);
    setTogglesValue(newToggleValues);
    if (!oldToggleValues.includes("list") && newToggleValues.includes("list")) {
      setSectionData({
        ...sectionData,
        payload: {
          ...sectionData.payload,
          content: sectionData.payload.content.map(
            (dataObject: iTextFieldComponentData) => ({
              ...dataObject,
              list: [""],
            })
          ),
        },
      });
    }
  };
  const sanitzeSection = () => {
    if (!togglesValue.includes(optionalFields.description)) {
      let updatedContent = sectionData.payload.content;
      updatedContent.map((chapter: any) => {
        if (chapter.hasOwnProperty("description"))
          delete chapter["description"];
        return chapter;
      });
      setSectionData({
        ...sectionData,
        payload: {
          ...sectionData.payload,
          content: updatedContent,
        },
      });
    }
    if (!togglesValue.includes(optionalFields.list)) {
      const updatedContent = sectionData.payload.content.map((chapter: any) => {
        if (chapter.hasOwnProperty("list")) {
          delete chapter["list"];
          return chapter;
        }
      });
      setSectionData({
        ...sectionData,
        payload: {
          ...sectionData.payload,
          content: updatedContent,
        },
      });
    }
    if (!togglesValue.includes(optionalFields.date)) {
      const updatedContent = sectionData.payload.content.map((chapter: any) => {
        if (chapter.hasOwnProperty("date")) {
          delete chapter["date"];
          return chapter;
        }
      });
      setSectionData({
        ...sectionData,
        payload: {
          ...sectionData.payload,
          content: updatedContent,
        },
      });
    }
  };

  return (
    <div>
      <div
        className="border-gradient-title m-0 p-3 px-4"
        // style={{
        //   color: `${settings.colorTheme?.heading}`,
        //   borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(0,0,0,0) 65%)`,
        //   backgroundColor: `${settings.colorTheme?.background}`,
        // }}
      >
        <Row>
          {/* SECTION TITLE */}
          <Col xs={12} className="">
            <Form.Text 
              // // style={{ color: `${settings.colorTheme?.heading}` }}
            >
              Section Title
            </Form.Text>
            <InputGroup>
              <Form.Control
                size="lg"
                value={sectionData.payload.title}
                aria-label={heading}
                aria-describedby="NewTitleSection"
                onChange={(e) => {
                  setSectionData({
                    ...sectionData,
                    payload: {
                      ...sectionData.payload,
                      title: e.target.value,
                    }
                  });
                }}
              />
            </InputGroup>
          </Col>
          <Col xs={1}>{/* DELETE SECTION / SHOULD BE KEBAB */}</Col>
        </Row>
      </div>
      <div
        className="border-gradient-body p-4"
        // style={{
        //   color: `${settings.colorTheme?.heading}`,
        //   borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(0,0,0,0) 65%)`,
        //   backgroundColor: `${settings.colorTheme?.background}`,
        // }}
      >
        {/* DROPDOWN SECTION TYPE */}
        <select
          className="custom-select w-100 text-md-center mb-4"
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
              className=" d-flex justify-content-between border mb-4"
              size="sm"
              type="checkbox"
              value={togglesValue}
              onChange={handleChangeButton}
            >
              <ToggleButton
                variant="outline-accent"
                id="tbg-btn-1"
                value={"list"}
                // style={{ color: `${settings.colorTheme?.heading}` }}
              >
                List
              </ToggleButton>
              <ToggleButton
                variant="outline-accent"
                id="tbg-btn-2"
                value={"description"}
                // style={{ color: `${settings.colorTheme?.heading}` }}
              >
                Description
              </ToggleButton>
              <ToggleButton
                variant="outline-accent"
                id="tbg-btn-3"
                value={"dates"}
                // style={{ color: `${settings.colorTheme?.heading}` }}
              >
                Date
              </ToggleButton>
            </ToggleButtonGroup>
            <hr
              // style={{ borderColor: `${settings.colorTheme?.accent}` }}
              className="border-2 opacity-100"
            />
            {/* Sections Foreach */}
            {sectionData.payload.content?.map(
              (textField: iTextFieldComponentData, index: number) => {
                return (
                  <InputGroup key={`${index}`}>
                    {/* Title */}
                    <div className="w-100 mb-4">
                      <Form.Group
                        id={`${sectionData.id} + ${textField.title} + ${index} `}
                      >
                        <Form.Text
                          // style={{ color: `${settings.colorTheme?.heading}` }}
                        >
                          Text Title
                        </Form.Text>
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
                      </Form.Group>
                    </div>
                    {/* Subtitle */}
                    <div className="w-100 mb-4">
                      <Form.Group
                        id={`${sectionData.id} + ${textField.subtitle} + ${index} `}
                      >
                        <Form.Text
                          // style={{ color: `${settings.colorTheme?.heading}` }}
                        >
                          Subtitle
                        </Form.Text>
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
                      </Form.Group>
                    </div>
                    {/* IF DESCRIPTION */}
                    {togglesValue.includes("description") && (
                      <div className="w-100 mb-4">
                        <Form.Group
                          id={`${sectionData.id} + ${textField.subtitle} + ${index} `}
                        >
                          <Form.Text
                            // style={{ color: `${settings.colorTheme?.heading}` }}
                          >
                            Description
                          </Form.Text>
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
                        </Form.Group>
                      </div>
                    )}
                    {/* IF LISTS */}
                    {togglesValue.includes("list") && (
                      <>
                        <Form.Text
                          // style={{
                          //   color: `${settings.colorTheme?.heading}`,
                          // }}
                        >
                          List
                        </Form.Text>
                        {textField?.list &&
                          textField.list?.map(
                            (listElement: string, listIndex: number) => {
                              return (
                                <InputGroup
                                  className="mb-2"
                                  key={`${sectionData.id} + ${textField.title}+${listIndex}`}
                                >
                                  <div className="w-100">
                                    <div className="w-100 d-flex">
                                      <Form.Group
                                        className="w-100"
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
                                      <div className="align-items-center d-flex justify-content-end ps-2">
                                        <ImCross
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleRemove(
                                              index,
                                              "list",
                                              listIndex
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </InputGroup>
                              );
                            }
                          )}
                        <div className=" d-flex mb-4 w-100 justify-content-center">
                          <Button
                            className="justify rounded-5"
                            variant="primary"
                            // style={{
                            //   backgroundColor: settings.colorTheme?.accent,
                            //   color: settings.colorTheme?.background,
                            // }}
                            onClick={() => handleAddListItem(index)}
                          >
                            +
                          </Button>
                        </div>
                      </>
                    )}
                    {/* IF DATES */}
                    {togglesValue.includes("dates") && (
                      <Row className=" d-flex w-100 mb-4">
                        {/* Start Date FORM */}
                        <Col xs={12} md={6} className="ps-0 p-0-md-down ">
                          <Form.Group
                            id={`${sectionData.id} + ${textField.startDate} + ${index} `}
                          >
                            <Form.Text
                              // style={{ color: settings.colorTheme?.heading }}
                            >
                              Start Date
                            </Form.Text>
                            <Form.Control
                              aria-label="Description"
                              value={textField.startDate}
                              type="month"
                              name="startDate"
                              required
                              // style={{ color: settings.colorTheme?.accent }}
                              onChange={(e) => {
                                inputFieldOnChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                );
                              }}
                            />
                          </Form.Group>
                        </Col>
                        {/* END Date FORM */}
                        <Col xs={12} md={6} className="pe-0 p-0-md-down ">
                          <Form.Group
                            id={`${sectionData.id} + ${textField.endDate} + ${index} `}
                          >
                            <Form.Text
                              // style={{ color: settings.colorTheme?.heading }}
                            >
                              End Date
                            </Form.Text>
                            <Form.Control
                              aria-label="Description"
                              value={textField.endDate}
                              type="month"
                              name="endDate"
                              required
                              // style={{ color: settings.colorTheme?.accent }}
                              onChange={(e) => {
                                inputFieldOnChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                );
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                    {/* Remove Text Field */}
                    <div className="w-100 d-flex justify-content-end">
                      <Button
                        variant="primary mb-2 rounded"
                        onClick={() => handleRemove(index)}
                      >
                        Remove Text Field
                      </Button>
                    </div>
                    <hr
                      // style={{ borderColor: `${settings.colorTheme?.accent}` }}
                      className=" w-100 border-2 opacity-100 mb-4"
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
            {sectionData.payload.content?.map(
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
                          min={undefined}
                          max={10}
                          name="Skill"
                          required
                          onChange={
                            (e) => {
                              {
                                // Validate the input before setting the state
                                const inputValue = parseInt(e.target.value, 10);
                                const validatedValue = isNaN(inputValue)
                                  ? 0
                                  : Math.min(Math.max(inputValue, 0), 10);
                                inputFieldOnChange(
                                  index,
                                  "level",
                                  validatedValue
                                );
                              }
                            }
                            // inputFieldOnChange(index, "level", e.target.value);
                            // }
                          }
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
            {sectionData.payload.content?.map(
              (pieChartSection: iPieChartComponentData, index: number) => {
                return (
                  <InputGroup key={`${index}`}>
                    <Row className="g-3">
                      <Form.Group
                        as={Col}
                        xs={7}
                        id={`${sectionData.id} + ${sectionData.payload.title} + ${index} `}
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
                        id={`${sectionData.id} + ${pieChartSection.percent} + ${index}`}
                      >
                        <Form.Control
                          aria-label="Level"
                          value={pieChartSection.percent}
                          type="number"
                          min={0}
                          name="percent"
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
      </div>
      <div
        className="d-flex justify-content-end"
        // style={{
        //   color: `${settings.colorTheme?.heading}`,
        //   borderImageSource: `linear-gradient(165deg, ${settings.colorTheme?.accent}, rgba(0,0,0,0) 65%)`,
        //   backgroundColor: `${settings.colorTheme?.background}`,
        // }}
      >
        {/* SAVE SECTION + SANITIZE SECTION + STATE-OLD */}
        <div className="mb-4">
          <Button
            className="btn btn-accent me-1"
            onClick={() => {
              sectionData.payload.state = "old";
              sanitzeSection();
              onSave();
            }}
          >
            {" "}
            Cancel Edit{" "}
          </Button>
          <Button
            className="btn btn-accent me-1"
            onClick={() => {
              onDelete();
            }}
          >
            {" "}
            Delete Section
          </Button>
          <Button
            className="btn btn-accent me-1"
            onClick={() => {
              sectionData.payload.state = "old";
              sanitzeSection();
              onSave(sectionData);
            }}
          >
            {" "}
            Save Section
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CVSectionModify;
