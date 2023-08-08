import { Button, Col, Row } from "react-bootstrap";
import { CVInterface, Section, Settings } from "../../entities/cvInterfaces";
import CVSectionCard from "./CVSectionCard";
import PieChartField from "./CVSectionCardSubComponents/PieChartField";
import ProgressbarField from "./CVSectionCardSubComponents/ProgressbarField";
import TextField from "./CVSectionCardSubComponents/TextField";
import { useState } from "react";
import CVSectionModify from "./CVEdit/CVSectionModify";
import { MdOutlineAddCircle } from "react-icons/md";
import { isEmpty } from "lodash";
import { produce } from "immer";
import ConfirmationModal from "../shared/modals/ConfirmationModal";
import { setAutoFreeze } from "immer";
setAutoFreeze(false);
import { DragDropContext } from "@hello-pangea/dnd";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface Props {
  data: CVInterface;
  isEditingMode: boolean;
  settings: Settings;
}

const CVBody = ({ data, isEditingMode, settings }: Props) => {
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
  const onDragEnd = (result: { destination: any; source: any }) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    setCVData(
      produce(cvData, (draftCvData) => {
        let itemToMove = draftCvData.data.sections[source.droppableId].splice(
          source.index,
          1
        )[0];
        draftCvData.data.sections[destination.droppableId].splice(
          destination.index,
          0,
          itemToMove
        );
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
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
          <Col xs={12} md={6}>
            <div className="d-flex justify-content-center">
              {isEditingMode && editingIndex === null && (
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
            <Droppable
              droppableId="leftCol"
              type="Section"
              key={"DropapbleLeftCol"}
            >
              {(provided, snapshot) => (
                <div
                  key={"leftCol"}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? `${settings.colorTheme?.background}`
                      : `${settings.colorTheme?.text}`,
                  }}
                  {...provided.droppableProps}
                >
                  {cvData.data.sections.leftCol.map(
                    (section: Section, index: number) => {
                      return (
                        <Draggable
                          key={section.id}
                          draggableId={`${section.id}+${section.title}+${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              key={`${section.id} + ${index}`}
                              className="mty cv-section"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {(editingIndex === index &&
                                editingCol === "leftCol" &&
                                isEditingMode === true) ||
                              section.state === "new" ? (
                                <CVSectionModify
                                  settings={data.settings}
                                  data={section}
                                  index={data.id}
                                  heading={section.title}
                                  key={index}
                                  onSave={saveSection}
                                  onDelete={() => {
                                    setshowConfirmationModal(true);
                                    setDeleteData({
                                      index: index,
                                      col: "leftCol",
                                    });
                                  }}
                                />
                              ) : (
                                <CVSectionCard
                                  settings={data.settings}
                                  isEditing={isEditingMode}
                                  data={section}
                                  index={index}
                                  heading={section.title}
                                  onClick={() => {
                                    onEdit(index, "leftCol");
                                  }}
                                >
                                  {section.type === "Progress-bar" ? (
                                    <ProgressbarField
                                      data={section.data.content}
                                      settings={data.settings}
                                    />
                                  ) : section.type === "Text-field" ? (
                                    <TextField
                                      data={section.data.content}
                                      settings={data.settings}
                                    />
                                  ) : section.type === "Pie-Chart" ? (
                                    <PieChartField
                                      data={section.data.content}
                                      settings={data.settings}
                                    />
                                  ) : null}
                                </CVSectionCard>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
          <Col xs={12} md={6}>
            <div className="d-flex justify-content-center">
              {isEditingMode && editingIndex === null && (
                <Button
                  variant="primary"
                  className={`border p-4 m-3 rounded-5 `}
                  onClick={() => addSection("rightCol")}
                >
                  Add new section
                  <MdOutlineAddCircle />
                </Button>
              )}
            </div>
            <Droppable
              droppableId="rightCol"
              type="Section"
              key={"DropapbleRightCol"}
            >
              {(provided, snapshot) => (
                <div
                  key={"rightCol"}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? `${settings.colorTheme?.background}`
                      : `${settings.colorTheme?.background}`,
                  }}
                  {...provided.droppableProps}
                >
                  {cvData.data.sections.rightCol.map(
                    (section: Section, index: number) => {
                      return (
                        <Draggable
                          key={section.id}
                          draggableId={`${section.id}+${section.title}+${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              key={`${section.id} + ${index}`}
                              className="mty cv-section"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {(editingIndex === index &&
                                editingCol === "rightCol" &&
                                isEditingMode === true) ||
                              section.state === "new" ? (
                                <CVSectionModify
                                  settings={data.settings}
                                  data={section}
                                  index={data.id}
                                  heading={section.title}
                                  key={index}
                                  onSave={saveSection}
                                  onDelete={() => {
                                    setshowConfirmationModal(true);
                                    setDeleteData({
                                      index: index,
                                      col: "rightCol",
                                    });
                                  }}
                                />
                              ) : (
                                <CVSectionCard
                                  settings={data.settings}
                                  isEditing={isEditingMode}
                                  data={section}
                                  index={index}
                                  heading={section.title}
                                  onClick={() => {
                                    onEdit(index, "rightCol");
                                  }}
                                >
                                  {section.type === "Progress-bar" ? (
                                    <ProgressbarField
                                      data={section.data.content}
                                      settings={data.settings}
                                    />
                                  ) : section.type === "Text-field" ? (
                                    <TextField
                                      data={section.data.content}
                                      settings={data.settings}
                                    />
                                  ) : section.type === "Pie-Chart" ? (
                                    <PieChartField
                                      data={section.data.content}
                                      settings={data.settings}
                                    />
                                  ) : null}
                                </CVSectionCard>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        </Row>
      </div>
    </DragDropContext>
  );
};

export default CVBody;
