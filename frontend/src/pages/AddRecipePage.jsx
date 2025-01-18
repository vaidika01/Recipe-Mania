import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #faf3e0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 80px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4757;
  }

  &:disabled {
    background-color: #e1e1e1;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #6a4c41;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Notification = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: ${(props) => (props.success ? "green" : "red")};
  background-color: ${(props) => (props.success ? "#d4edda" : "#f8d7da")};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #ff6b6b;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !ingredients.trim() || !preparation.trim()) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("preparation", preparation);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      await axios.post("/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess(true);
      setTitle("");
      setIngredients("");
      setPreparation("");
      setImage(null);
      navigate("/recipes");
    } catch (error) {
      console.error(
        "Error adding recipe:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to add recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Add a New Recipe</Title>
        {success && (
          <Notification success>Recipe added successfully!</Notification>
        )}
        {error && <Notification>{error}</Notification>}
        <Form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <InputField
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <TextArea
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <TextArea
            placeholder="Preparation Instructions"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader /> : "Add Recipe"}
          </SubmitButton>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddRecipePage;
