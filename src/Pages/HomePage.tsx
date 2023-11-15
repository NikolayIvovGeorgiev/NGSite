import { DragDropContext } from "@hello-pangea/dnd";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { produce } from "immer";
import ToDoList from "../mocked-data/toDoTasks";

const HomePage = () => {
  const initToggles = () => {
    let togglesList: any = { toDoTasks: [], completedTasks: [] };
    ToDoList.toDoTasks.forEach(() => togglesList.toDoTasks.push(false));
    ToDoList.completedTasks.forEach(() =>
      togglesList.completedTasks.push(false)
    );

    // console.log(togglesList);

    return togglesList;
  };

  useState(() => {});

  const [taskLists, setTaskLists] = useState(ToDoList);
  const [toggle, setToggle] = useState(initToggles());

  const toggleInput = (array: string, index: number) => {
    console.log(array, index, toggle);

    setToggle(
      produce(toggle, (toggleDraft: any) => {
        toggleDraft[array][index] = !toggleDraft[array][index];
      })
    );
  };

  const handleChange = (index: number, array: string, value: string) => {
    setTaskLists(
      produce(taskLists, (draftTasks) => {
        draftTasks[array][index] = value;
      })
    );

    // const updatedTasks = [...taskLists[array]];
    // updatedTasks[index] = value;

    // setTaskLists({
    //   ...taskLists,
    //   [array]: updatedTasks,
    // });
  };

  const onDragEnd = (result: { destination: any; source: any }) => {
    const { destination, source } = result;

    console.log("source", source);
    console.log(`destination`, destination);

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    setTaskLists(
      produce(taskLists, (draftTaskLists) => {
        let itemToMove = draftTaskLists[source.droppableId].splice(
          source.index,
          1
        )[0];
        draftTaskLists[destination.droppableId].splice(
          destination.index,
          0,
          itemToMove
        );
      })
    );
  };
  return (
    <>
      <div className="p-4 mb-4">Plain Text</div>
      <div className="p-4 mb-4 fs-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <Col xs={6} md={6}>
              <Droppable
                droppableId={"toDoTasks"}
                key={"toDoTasks"}
                type="List"
              >
                {(provided) => (
                  <div
                    className="border p-4 shadow-lg"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>To Do</h2>
                    {taskLists.toDoTasks.map((value: string, index: number) => {
                      return (
                        <Draggable
                          key={`toDoTask + ${index}`}
                          draggableId={`toDoTask + ${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              key={`toDoTask + ${index}`}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                className="c-pointer w-100 mb-4 my-4"
                                // onClick={clickOnCard}
                                style={{ width: "18rem" }}
                              >
                                <Card.Body>
                                  {!toggle.toDoTasks[index] ? (
                                    <Card.Text
                                      onDoubleClick={() => {
                                        toggleInput("toDoTasks", index);
                                      }}
                                    >
                                      {value}
                                    </Card.Text>
                                  ) : (
                                    <input
                                      onBlur={() => {
                                        toggleInput("toDoTasks", index);
                                      }}
                                      className="w-100"
                                      type="text"
                                      value={value}
                                      onChange={(e) => {
                                        handleChange(
                                          index,
                                          "toDoTasks",
                                          e.target.value
                                        );
                                      }}
                                    />
                                  )}
                                </Card.Body>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col xs={6} md={6}>
              <Droppable
                droppableId={"completedTasks"}
                key={"completedTasks"}
                type="List"
              >
                {(provided) => (
                  <div
                    className="border p-4 shadow-lg"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>Completed Tasks</h2>
                    {taskLists.completedTasks.map(
                      (value: string, index: number) => {
                        return (
                          <Draggable
                            key={`completedTasks + ${index}`}
                            draggableId={`completedTasks + ${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                key={`completedTasks + ${index}`}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  className="c-pointer w-100 mb-4 my-4"
                                  // onClick={clickOnCard}
                                  style={{ width: "18rem" }}
                                >
                                  <Card.Body>
                                    {!toggle.toDoTasks[index] ? (
                                      <Card.Text
                                        onDoubleClick={() => {
                                          toggleInput("completedTasks", index);
                                        }}
                                      >
                                        {value}
                                      </Card.Text>
                                    ) : (
                                      <input
                                        onBlur={() => {
                                          toggleInput("toDoTasks", index);
                                        }}
                                        className="w-100"
                                        type="text"
                                        value={value}
                                        onChange={(e) => {
                                          handleChange(
                                            index,
                                            "toDoTasks",
                                            e.target.value
                                          );
                                        }}
                                      />
                                    )}
                                  </Card.Body>
                                </Card>
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
            {/* <Col xs={6} md={6} className="d-flex align-items-center">
              <Droppable
                droppableId={"completedTasks"}
                key={"completedTasks"}
                type="List"
              >
                {(provided, snapshot) => (
                  <div
                    className="border p-4 shadow-lg"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>Done</h2>
                    {taskLists.completedTasks.map(
                      (value: string, index: number) => {
                        return (
                          <Draggable
                            key={`completedTasks + ${index}`}
                            draggableId={`completedTasks + ${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                key={`completedTasks + ${index}`}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  className="c-pointer w-100 mb-4 my-4"
                                  onClick={clickOnCard}
                                  style={{ width: "18rem" }}
                                >
                                  <Card.Body>
                                    <Card.Text>{value}</Card.Text>
                                  </Card.Body>
                                </Card>
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
            </Col> */}
          </Row>
        </DragDropContext>
      </div>
    </>
  );
};

export default HomePage;
