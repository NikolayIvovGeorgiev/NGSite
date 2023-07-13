import { Button, Col, Container, Row } from "react-bootstrap";
import { CVInterface, Section } from "../../entities/cvInterfaces";
import CVSectionCard from "./CVSectionCard";
import PieChartField from "./CVSectionCardSubComponents/PieChartField";
import ProgressbarField from "./CVSectionCardSubComponents/ProgressbarField";
import TextField from "./CVSectionCardSubComponents/TextField";
import { useEffect, useState } from "react";
import CVSectionModify from "./CVEdit/CVSectionModify";
import { MdOutlineAddCircle } from "react-icons/md";

interface Props {
  data: CVInterface;
  isEditing: boolean;
}

const CVBody = ({ data, isEditing }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCol, setEditingCol] = useState<string | null>(null);
  const [cvData, setCVData] = useState<CVInterface>(data);

  const createNewSection = () => {
    const newSection = {
      id: `${Math.random() * 10}`,
      type: "",
      title: "",
      state: "new",
      data: {
        config: {},
        content: [],
      },
    };

    return newSection;
  };

  const onEdit = (index: number, targetColumn: string) => {
    setEditingIndex(index);
    setEditingCol(targetColumn);
  };

  const addSection = (col: any) => {
    console.log(editingIndex, editingCol);
    setEditingIndex(0);
    setEditingCol(col);
    console.log(isEditing);

    setCVData({
      ...cvData,
      data: {
        ...cvData.data,
        sections: {
          ...cvData.data.sections,
          [col]: [createNewSection(), ...cvData.data.sections[col]],
        },
      },
    });
    console.log(cvData.data.sections);
  };

  const saveSection = (section: Section) => {
    if (
      editingCol !== null &&
      editingIndex !== null &&
      editingIndex !== undefined
    ) {
      let updatedCol = cvData.data.sections[editingCol];
      updatedCol[editingIndex] = section;
      setCVData({
        ...cvData,
        data: {
          ...cvData.data,
          sections: {
            ...cvData.data.sections,
            [editingCol]: [...updatedCol],
          },
        },
      });
    }
    setEditingIndex(null);
    setEditingCol(null);
  };

  return (
    <Container className="flex">
      <Row>
        <Col xs={6} className="border">
          <div className="d-flex justify-content-center">
            {isEditing && (
              <Button
                variant="primary"
                className={`border p-4 m-3 rounded-5 `}
                onClick={() => addSection("leftCol")}
              >
                Add new section
                <MdOutlineAddCircle />
              </Button>
            )}
          </div>
          {cvData.data.sections.leftCol.map(
            (section: Section, index: number) => {
              if (
                (editingIndex === index &&
                  editingCol === "leftCol" &&
                  isEditing === true) ||
                section.state === "new"
              ) {
                return (
                  <CVSectionModify
                    data={section}
                    index={data.id}
                    heading={section.title}
                    key={index}
                    onSave={saveSection}
                  />
                );
              } else {
                return (
                  <CVSectionCard
                    isEditing={isEditing}
                    data={section}
                    index={index}
                    heading={section.title}
                    key={index}
                    onClick={() => {
                      onEdit(index, "leftCol");
                    }}
                  >
                    {section.type === "Progress-bar" ? (
                      <ProgressbarField data={section.data.content} />
                    ) : section.type === "Text-field" ? (
                      <TextField data={section.data.content} />
                    ) : section.type === "Pie-Chart" ? (
                      <PieChartField data={section.data.content} />
                    ) : null}
                  </CVSectionCard>
                );
              }
            }
          )}
        </Col>
        <Col className="border">
          <div className="d-flex justify-content-center">
            {isEditing && (
              <Button
                variant="primary"
                className="border p-4 m-3 rounded-5 text-center"
                onClick={() => addSection("rightCol")}
              >
                Add new section
                <MdOutlineAddCircle />
              </Button>
            )}
          </div>
          {cvData.data.sections.rightCol.map(
            (section: Section, index: number) => {
              if (
                (editingIndex === index && editingCol === "rightCol") ||
                section.state === "new"
              ) {
                return (
                  <CVSectionModify
                    data={section}
                    index={index}
                    heading={section.title}
                    key={index}
                    onSave={saveSection}
                  />
                );
              } else {
                return (
                  <CVSectionCard
                    isEditing={isEditing}
                    data={section}
                    index={index}
                    heading={section.title}
                    key={index}
                    onClick={() => onEdit(index, "rightCol")}
                  >
                    {section.type === "Progress-bar" ? (
                      <ProgressbarField data={section.data.content} />
                    ) : section.type === "Text-field" ? (
                      <TextField data={section.data.content} />
                    ) : section.type === "Pie-Chart" ? (
                      <PieChartField data={section.data.content} />
                    ) : null}
                  </CVSectionCard>
                );
              }
            }
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CVBody;
