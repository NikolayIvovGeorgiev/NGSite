import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteAuthToken, loginUser } from "../services/fetch.service";
import { Toast } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const NavBar = () => {
  const { authToken, setAuthToken } = useAuth();
  // const [isLogIn, setIsLogIn] = useState(getAuthToken() ? true : false);
  const [loginToast, setLoginToast] = useState({
    show: false,
    color: "primary",
    headerMessage: "",
    message: "",
  });
  const navigate = useNavigate();

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
      loginUser(payload)
        .then((response) => {
          setLoginToast({
            show: true,
            color: "primary",
            headerMessage: "Success",
            message: "Successfully Log in",
          });

          setTimeout(() => {
            setLoginToast({ ...loginToast, show: false });
          }, 1500);

          setAuthToken(response.data);
        })
        .catch((error) => {
          setLoginToast({
            show: true,
            color: "danger",
            headerMessage: "Error",
            message: `${error.response.data}`,
          });

          setTimeout(() => {
            setLoginToast({ ...loginToast, show: false });
          }, 1500);

          setAuthToken(null);
        });
    }
  };

  return (
    <>
      <Toast
        className="toast-style"
        show={loginToast.show}
        bg={loginToast.color}
      >
        <Toast.Header closeButton={false}>
          {loginToast.headerMessage}
        </Toast.Header>
        <Toast.Body>{loginToast.message}</Toast.Body>
      </Toast>
      <Navbar
        bg="background"
        expand="xl"
        className="fixed-bar top-0 bg-white shadow"
      >
        <Container className="p-0">
          <Navbar.Brand as={Link} to="/" className="">
            CV Builder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100 align-items-center justify-content-between">
              <div className="d-flex">
                <Nav.Item>
                  <Nav.Link as={Link} to="/test-page" className="nav-link ">
                    CV Example
                  </Nav.Link>
                </Nav.Item>
              </div>
              <div className="d-flex align-items-center">
                {!authToken && (
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
                {authToken && (
                  <>
                    <Nav.Item>
                      <Nav.Link as={Link} to="/cv" className="nav-link ">
                        CV Creator
                      </Nav.Link>
                    </Nav.Item>
                    <Button
                      variant="primary"
                      className="me-3"
                      onClick={() => {
                        deleteAuthToken();
                        setAuthToken(null);
                        navigate("/");
                      }}
                    >
                      {" "}
                      Log Out
                    </Button>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
