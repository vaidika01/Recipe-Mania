import React, { useState, useEffect } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPageContainer = styled.div`
  background-color: #faf3e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fffaf4;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: #6a4c41;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 25px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4757;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  color: ${({ success }) => (success ? "green" : "red")};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/recipes");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/recipes");
    } catch (error) {
      setMessage(error.message || "An error occurred during login");
    }
  };

  return (
    <LoginPageContainer>
      <LoginContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
        {message && (
          <Message success={message.includes("successful")}>{message}</Message>
        )}
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default Login;
