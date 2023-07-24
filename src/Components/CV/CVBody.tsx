import { Button, Col, Container, Row } from "react-bootstrap";
import { CVInterface, Section } from "../../entities/cvInterfaces";
import CVSectionCard from "./CVSectionCard";
import PieChartField from "./CVSectionCardSubComponents/PieChartField";
import ProgressbarField from "./CVSectionCardSubComponents/ProgressbarField";
import TextField from "./CVSectionCardSubComponents/TextField";
import { useEffect, useState } from "react";
import CVSectionModify from "./CVEdit/CVSectionModify";
import { MdOutlineAddCircle } from "react-icons/md";
import { isEmpty } from "lodash";
import { produce } from "immer";
import ConfirmationModal from "../shared/modals/ConfirmationModal";
import { setAutoFreeze } from "immer";
setAutoFreeze(false);

interface Props {
  data: CVInterface;
  isEditingMode: boolean;
}

const CVBody = ({ data, isEditingMode }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCol, setEditingCol] = useState<string | null>(null);
  const [cvData, setCVData] = useState<CVInterface>(data);
  const [showConfirmationModal, setshowConfirmationModal] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    index: number;
    col: string;
  } | null>(null);

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
    setEditingIndex(0);
    setEditingCol(col);

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

  const saveSection = (section?: Section) => {
    console.log(editingCol);
    console.log(editingIndex);
    console.log(isEmpty(section));

    if (
      editingCol !== null &&
      editingIndex !== null &&
      editingIndex !== undefined &&
      !isEmpty(section)
    ) {
      let updatedCol = cvData.data.sections[editingCol];
      debugger;

      updatedCol[editingIndex] = section;

      console.log(updatedCol[editingIndex]);
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
  const deleteSection = () => {
    if (deleteData) {
      setCVData(
        produce(cvData, (draftCvData) => {
          draftCvData.data.sections[deleteData.col].splice(deleteData.index, 1);
        })
      );
      setEditingCol(null);
      setEditingIndex(null);
      setshowConfirmationModal(false);
    }
  };

  return (
    <Container className="flex">
      <Row>
        <ConfirmationModal
          showModal={showConfirmationModal}
          onConfirm={() => {
            deleteSection();
          }}
          onDecline={() => {
            setshowConfirmationModal(false);
          }}
        />
        <Col xs={6} className="border">
          <div className="d-flex justify-content-center">
            {isEditingMode && (
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
              return (
                <div key={index} className="mty">
                  {(editingIndex === index &&
                    editingCol === "leftCol" &&
                    isEditingMode === true) ||
                  section.state === "new" ? (
                    <CVSectionModify
                      data={section}
                      index={data.id}
                      heading={section.title}
                      key={index}
                      onSave={saveSection}
                      onDelete={() => {
                        setshowConfirmationModal(true);
                        setDeleteData({ index: index, col: "leftCol" });
                      }}
                    />
                  ) : (
                    <CVSectionCard
                      isEditing={isEditingMode}
                      data={section}
                      index={index}
                      heading={section.title}
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
                  )}
                </div>
              );
            }
          )}
        </Col>
        <Col className="border">
          <div className="d-flex justify-content-center">
            {isEditingMode && (
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
                (editingIndex === index &&
                  editingCol === "rightCol" &&
                  isEditingMode === true) ||
                section.state === "new"
              ) {
                return (
                  <CVSectionModify
                    data={section}
                    index={index}
                    heading={section.title}
                    key={index}
                    onSave={saveSection}
                    onDelete={() => {
                      setshowConfirmationModal(true);
                      setDeleteData({ index: index, col: "rightCol" });
                    }}
                  />
                );
              } else {
                return (
                  <CVSectionCard
                    isEditing={isEditingMode}
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
