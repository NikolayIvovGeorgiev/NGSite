import { Button, Col, Container, Row } from "react-bootstrap";
import { CVInterface, Section } from "../../entities/cvInterfaces";
import CVSectionCard from "./CVSectionCard";
import PieChartField from "./CVSectionCardSubComponents/PieChartField";
import ProgressbarField from "./CVSectionCardSubComponents/ProgressbarField";
import TextField from "./CVSectionCardSubComponents/TextField";
import { useState } from "react";
import CVSectionModify from "./CVEdit/CVSectionModify";
import { MdOutlineAddCircle } from "react-icons/md";

interface Props {
  data: CVInterface;
}

const CVBody = ({ data }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCol, setEditingCol] = useState<string | null>(null);
  const [cvData, setCVData] = useState<CVInterface>(data);
  const createNewSection = () => {
    const newSection = {
      id: "",
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
  };

  const saveSection = (section: Section) => {
    if (editingCol && editingIndex !== null && editingIndex !== undefined) {
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
            <Button
              variant="primary"
              className="border p-4 m-3 rounded-5 text-center"
              onClick={() => addSection("leftCol")}
            >
              Add new section
              <MdOutlineAddCircle />
            </Button>
          </div>
          {cvData.data.sections.leftCol.map(
            (section: Section, index: number) => {
              if (
                (editingIndex === index && editingCol === "leftCol") ||
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
            <Button
              variant="primary"
              className="border p-4 m-3 rounded-5 text-center"
              onClick={() => addSection("rightCol")}
            >
              Add new section
              <MdOutlineAddCircle />
            </Button>
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
                    onSave={(saveSection) => {}}
                  />
                );
              } else {
                return (
                  <CVSectionCard
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
