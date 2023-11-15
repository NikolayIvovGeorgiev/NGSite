import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteAuthToken,
  getAuthToken,
  loginUser,
} from "../services/fetch.service";

const NavBar = () => {
  const [isLogIn, setIsLogIn] = useState(getAuthToken() ? true : false);

  useEffect(() => {
    window.addEventListener("storageUpdate", () => {
      setIsLogIn(getAuthToken() ? true : false);
    });
  });

  const handleLogIn = (event: any) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (password && username) {
      const payload = {
        username,
        password,
      };
      loginUser(payload);
    }
  };

  return (
    <Navbar
      bg="background"
      expand="xl"
      className="fixed-bar top-0 bg-white shadow"
    >
      <Container className="p-0">
        <Navbar.Brand as={Link} to="/" className="">
          Nikolay Georgiev
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 align-items-center justify-content-between">
            <div className="d-flex">
              <Nav.Item>
                <Nav.Link as={Link} to="/cv" className="nav-link ">
                  CV
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/test-page" className="nav-link ">
                  Test Page
                </Nav.Link>
              </Nav.Item>
            </div>
            <div className="d-flex align-items-center">
              {!isLogIn && (
                <>
                  <Form
                    className="d-flex align-items-center"
                    onSubmit={handleLogIn}
                  >
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="username"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="password"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className=" me-3 w-50 "
                    >
                      Log in
                    </Button>
                  </Form>
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to="/register-page"
                      className="nav-link "
                    >
                      Register
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
              {isLogIn && (
                <Button
                  variant="primary"
                  className="me-3"
                  onClick={deleteAuthToken}
                >
                  {" "}
                  Log Out
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
