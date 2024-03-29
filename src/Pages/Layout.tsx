import Container from "react-bootstrap/Container";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-secondary min-vh-100">
      <NavBar />
      <Container className="bg-white rounded-b shadow margin-top-bars">
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
