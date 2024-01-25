import { Button, Col, Row } from "react-bootstrap";
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
import { DragDropContext, DraggableLocation } from "@hello-pangea/dnd";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { colList, iCv, iPieChartComponentData, iProgressBarComponentData, iSection, iTextFieldComponentData } from "../../entities/cvInterfaces";

interface Props {
  data: iCv;
  isEditingMode: boolean;
}

const CVBody = ({ data, isEditingMode }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingCol, setEditingCol] = useState<colList | null>(null);
  const [cvData, setCVData] = useState<iCv>(data);
  const [showConfirmationModal, setshowConfirmationModal] = useState(false);
  const [deleteData, setDeleteData] = useState<{
    index: number;
    col: colList;
  } | null>(null);

  const createNewSection = (col: colList) => {
    const newSection: iSection = {
      id: `${Math.random() * 10}`,
      columnPosition: col,
      order: '0',
      payload: {
        type: "",
        title: "",
        state: "new",
        content: []
      },
    };
    console.log(cvData);
    
    return newSection;
  };

  const addSection = (col: colList) => {
    setEditingIndex(0);
    setEditingCol(col);
    setCVData({
      ...cvData,
      sections: {
        ...cvData.sections,
        [col]: [createNewSection(col), ...cvData.sections[col]],
      },
    });
    
  };
  
  const onEdit = (index: number, targetColumn: colList) => {
    setEditingIndex(index);
    setEditingCol(targetColumn);
  };

  const saveSection = (section?: iSection) => {
    console.log(section);
    
    // console.log(editingCol);
    // console.log(editingIndex);
    // console.log(isEmpty(section));

    if (
      editingCol !== null &&
      editingIndex !== null &&
      editingIndex !== undefined &&
      !isEmpty(section)
    ) {
      let updatedCol = cvData.sections[editingCol];

      updatedCol[editingIndex] = section;

      console.log(updatedCol[editingIndex]);
      setCVData({
        ...cvData,
        sections: {
          ...cvData.sections,
          [editingCol]: [...updatedCol],
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
          draftCvData.sections[deleteData.col].splice(deleteData.index, 1);
        })
      );
      setEditingCol(null);
      setEditingIndex(null);
      setshowConfirmationModal(false);
    }
  };

  const onDragEnd = ( result: {  destination: any; source: any }) => {
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
        let itemToMove = draftCvData.sections[source.droppableId as colList].splice(
          source.index,
          1
        )[0];
        draftCvData.sections[destination.droppableId as colList].splice(
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
              {(provided: any) => (
                <div
                  key={"leftCol"}
                  ref={provided.innerRef}
                  // style={{
                  //   backgroundColor: snapshot.isDraggingOver
                  //     ? `${settings.colorTheme?.background}`
                  //     : `${settings.colorTheme?.text}`,
                  // }}
                  {...provided.droppableProps}
                >
                  {cvData.sections.leftCol?.map(
                    (section: iSection, index: number) => {
                      return (
                        <Draggable
                          key={section.id}
                          draggableId={`${section.id}+${section.payload.title}+${index}`}
                          index={index}
                        >
                          {(provided: any) => (
                            <div
                              key={`${section.id} + ${index}`}
                              className="mty cv-section "
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {(editingIndex === index &&
                                editingCol === "leftCol" &&
                                isEditingMode === true) ||
                              section.payload.state === "new" ? (
                                <CVSectionModify
                                  data={section}
                                  // index={data.id}
                                  heading={section.payload.title}
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
                                  isEditing={isEditingMode}
                                  // data={section}
                                  index={index}
                                  heading={section.payload.title}
                                  onClick={() => {
                                    onEdit(index, "leftCol");
                                  }}
                                >
                                  {section.payload.type === "Progress-bar" ? (
                                    <ProgressbarField
                                      data={
                                        section.payload.content as iProgressBarComponentData[]
                                      }
                                    />
                                  ) : section.payload.type === "Text-field" ? (
                                    <TextField
                                      data={section.payload.content as iTextFieldComponentData[]}
                                    />
                                  ) : section.payload.type === "Pie-Chart" ? (
                                    <PieChartField
                                      data={section.payload.content as iPieChartComponentData[]}
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
              {(provided) => (
                <div
                  key={"rightCol"}
                  ref={provided.innerRef}
                  // style={{
                  //   backgroundColor: snapshot.isDraggingOver
                  //     ? `${settings.colorTheme?.background}`
                  //     : `${settings.colorTheme?.background}`,
                  // }}
                  {...provided.droppableProps}
                >
                  {cvData.sections.rightCol?.map(
                    (section: iSection, index: number) => {
                      return (
                        <Draggable
                          key={section.id}
                          draggableId={`${section.id}+${section.payload.title}+${index}`}
                          index={index}
                        >
                          {(provided) => (
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
                              section.payload.state === "new" ? (
                                <CVSectionModify
                                  data={section}
                                  // index={data.id}
                                  heading={section.payload.title}
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
                                  isEditing={isEditingMode}
                                  // data={section}
                                  index={index}
                                  heading={section.payload.title}
                                  onClick={() => {
                                    onEdit(index, "rightCol");
                                  }}
                                >
                                   {section.payload.type === "Progress-bar" ? (
                                    <ProgressbarField
                                      data={
                                        section.payload.content as iProgressBarComponentData[]
                                      }
                                    />
                                  ) : section.payload.type === "Text-field" ? (
                                    <TextField
                                      data={section.payload.content as iTextFieldComponentData[]}
                                    />
                                  ) : section.payload.type === "Pie-Chart" ? (
                                    <PieChartField
                                      data={section.payload.content as iPieChartComponentData[]}
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
