import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  getAuthToken,
  loginUser,
  registerUser,
} from "../services/fetch.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = (event: any) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const username = data.get("username")?.toString();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (username && password && confirmPassword) {
      const payload = {
        username,
        password,
        confirmPassword,
      };
      registerUser(payload).then(() => {
        const loginPayload = {
          username,
          password,
        };
        loginUser(loginPayload).then(() => {
          navigate("/cv");
        });
      });
    }
  };
  return (
    <div>
      <Form onSubmit={handleRegister} className="p-4 w-100">
        <Form.Group controlId="username" className="mb-4">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group controlId="ConfirmPassword" className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-4 w-100">
          Register
        </Button>
      </Form>
    </div>
  );
};
export default RegisterPage;
