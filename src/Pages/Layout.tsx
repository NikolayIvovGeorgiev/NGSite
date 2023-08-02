import Container from "react-bootstrap/Container";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-secondary min-vh-100">
      <NavBar />
      <Container className="p-0 bg-white rounded-b shadow">
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
