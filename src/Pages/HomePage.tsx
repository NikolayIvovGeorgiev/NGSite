import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { produce } from "immer";
import ToDoList from "../mocked-data/toDoTasks";
import { TaskList } from "../entities/cvInterfaces";

const HomePage = () => {
  const [taskLists, setTaskLists] = useState(ToDoList);
  const clickOnCard = () => {
    console.log(123);
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
      <div className="w-100 p-4 mb-4">Plain Text</div>
      <div className="p-4 mb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <Col xs={6} md={6}>
              <Droppable
                droppableId={"toDoTasks"}
                key={"toDoTasks"}
                type="List"
              >
                {(provided, snapshot) => (
                  <div
                    className="border p-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {taskLists.toDoTasks.map((value: string, index: number) => {
                      return (
                        <Draggable
                          key={`toDoTask + ${index}`}
                          draggableId={`toDoTask + ${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              key={`toDoTask + ${index}`}
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
                {(provided, snapshot) => (
                  <div
                    className="border p-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
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
            </Col>
          </Row>
        </DragDropContext>
      </div>
    </>
  );
};

export default HomePage;
