import ListGroup from "react-bootstrap/esm/ListGroup";

const CVSideBar = () => {
  return (
    <ListGroup>
      <ListGroup.Item action eventKey="NewComponent">
        New Component
      </ListGroup.Item>
      <ListGroup.Item action eventKey="PieChartComponent ">
        Pie Chart Component
      </ListGroup.Item>
      <ListGroup.Item action eventKey="ProgressBarComponent ">
        Progress bar Component
      </ListGroup.Item>
      <ListGroup.Item action eventKey="TextFieldComponent ">
        Text Field Component
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CVSideBar;
