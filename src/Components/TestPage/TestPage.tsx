// import { useState } from "react";
// import {
//   DndContext,
//   DragOverlay,
//   closestCorners,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors
// } from "@dnd-kit/core";
// import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

// import Container from "./Container";
// import { Item } from "./Sortable_item";

// const wrapperStyle = {
//   display: "flex",
//   flexDirection: "row"
// };

// const defaultAnnouncements = {
//   onDragStart(id: any) {
//     console.log(`Picked up draggable item ${id}.`);
//   },
//   onDragOver(id: any, overId: any) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was moved over droppable area ${overId}.`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} is no longer over a droppable area.`);
//   },
//   onDragEnd(id: any, overId: any) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was dropped over droppable area ${overId}`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} was dropped.`);
//   },
//   onDragCancel(id: any) {
//     console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
//   }
// };

// export default function App() {
//   const [items, setItems] = useState({
//     root: ["1", "2", "3"],
//     container1: ["4", "5", "6"],
//     container2: ["7", "8", "9"],
//     container3: []
//   });
//   const [activeId, setActiveId] = useState();

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates
//     })
//   );

//   return (
//     <div className="border">
//       <DndContext
//         announcements={defaultAnnouncements}
//         sensors={sensors}
//         collisionDetection={closestCorners}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//       >
//         <Container id="root" items={items.root} />
//         <Container id="container1" items={items.container1} />
//         <Container id="container2" items={items.container2} />
//         <Container id="container3" items={items.container3} />
//         <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
//       </DndContext>
//     </div>
//   );

//   function findContainer(id: string) {
//     if (id in items) {
//       return id;
//     }

//     return Object.keys(items).find((key) => items[key].includes(id));
//   }

//   function handleDragStart(event: { active: any; }) {
//     const { active } = event;
//     const { id } = active;

//     setActiveId(id);
//   }

//   function handleDragOver(event: { active: any; over: any; draggingRect: any; }) {
//     const { active, over, draggingRect } = event;
//     const { id } = active;
//     const { id: overId } = over;

//     // Find the containers
//     const activeContainer = findContainer(id);
//     const overContainer = findContainer(overId);

//     if (
//       !activeContainer ||
//       !overContainer ||
//       activeContainer === overContainer
//     ) {
//       return;
//     }

//     setItems((prev) => {
//       const activeItems = prev[activeContainer];
//       const overItems = prev[overContainer];

//       // Find the indexes for the items
//       const activeIndex = activeItems.indexOf(id);
//       const overIndex = overItems.indexOf(overId);

//       let newIndex;
//       if (overId in prev) {
//         // We're at the root droppable of a container
//         newIndex = overItems.length + 1;
//       } else {
//         const isBelowLastItem =
//           over &&
//           overIndex === overItems.length - 1 &&
//           draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

//         const modifier = isBelowLastItem ? 1 : 0;

//         newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
//       }

//       return {
//         ...prev,
//         [activeContainer]: [
//           ...prev[activeContainer].filter((item: any) => item !== active.id)
//         ],
//         [overContainer]: [
//           ...prev[overContainer].slice(0, newIndex),
//           items[activeContainer][activeIndex],
//           ...prev[overContainer].slice(newIndex, prev[overContainer].length)
//         ]
//       };
//     });
//   }

//   function handleDragEnd(event: { active: any; over: any; }) {
//     const { active, over } = event;
//     const { id } = active;
//     const { id: overId } = over;

//     const activeContainer = findContainer(id);
//     const overContainer = findContainer(overId);

//     if (
//       !activeContainer ||
//       !overContainer ||
//       activeContainer !== overContainer
//     ) {
//       return;
//     }

//     const activeIndex = items[activeContainer].indexOf(active.id);
//     const overIndex = items[overContainer].indexOf(overId);

//     if (activeIndex !== overIndex) {
//       setItems((items) => ({
//         ...items,
//         [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
//       }));
//     }

//     setActiveId(null);
//   }
// }

// // import { useState } from "react";
// // import Container from "react-bootstrap/Container";

// // import { DndContext, closestCenter } from "@dnd-kit/core";
// // import {
// //   arrayMove,
// //   SortableContext,
// //   verticalListSortingStrategy,
// // } from "@dnd-kit/sortable";

// // import { SortableItem } from "./SortableItem";
// // import { Col, Row } from "react-bootstrap";

// // const sections = {
// //   leftCol: [
// //     {
// //       id: "2345",
// //       type: "Text-field",
// //       title: "Education",
// //       data: {
// //         config: {},
// //         content: [
// //           {
// //             title: "Bachelor - Ecology and Environmental Management",
// //             subtitle: "New Bulgarian University",
// //           },
// //           {
// //             title:
// //               "Secondary education - Advanced learning of Russian and English",
// //             subtitle: "125 SOU “Boyan Penev” - Foreign Languages",
// //           },
// //         ],
// //       },
// //     },
// //   ],
// //   rightCol: [
// //     {
// //       id: "2345",
// //       type: "Text-field",
// //       title: "Education",
// //       data: {
// //         config: {},
// //         content: [
// //           {
// //             title: "Bachelor - Ecology and Environmental Management",
// //             subtitle: "New Bulgarian University",
// //           },
// //           {
// //             title:
// //               "Secondary education - Advanced learning of Russian and English",
// //             subtitle: "125 SOU “Boyan Penev” - Foreign Languages",
// //           },
// //         ],
// //       },
// //     },
// //   ],
// // };

// // const TestPage = () => {
// //   const [languages, setLanguages] = useState([
// //     "Javascript",
// //     "Python",
// //     "Typescript",
// //   ]);

// //   return (
// //     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
// //       <Container className="p-3 text-center" style={{ width: "50%" }}>
// //         <h3>The best programming languages</h3>
// //         <Row className="flex">
// //           <Col>
// //             <SortableContext
// //               items={languages}
// //               strategy={verticalListSortingStrategy}
// //             >
// //               {languages.map((language) => (
// //                 <SortableItem key={language} id={language} />
// //               ))}
// //             </SortableContext>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </DndContext>
// //   );
// //   function handleDragEnd(event: any) {
// //     const { active, over } = event;
// //     console.log("Active:" + active.id);
// //     console.log("Over:" + over.id);

// //     if (active.id !== over.id) {
// //       setLanguages((items) => {
// //         const activeIndex = items.indexOf(active.id);
// //         const overIndex = items.indexOf(over.id);
// //         console.log(arrayMove(items, activeIndex, overIndex));
// //         return arrayMove(items, activeIndex, overIndex);
// //       });
// //     }
// //   }
// // };
// // export default TestPage;
