import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import axios from "../services/axiosInstance";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: 20px;
  background-color: #faf3e0;
  min-height: 100vh;
  padding-top: 80px;
`;

const NoRecipesMessage = styled.h2`
  text-align: center;
  margin-top: 50px;
  color: #6a4c41;
  font-family: "Arial", sans-serif;
`;

const Button = styled(Link)`
  display: block;
  padding: 12px 24px;
  background-color: #ff6b6b;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  margin: 20px auto;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  max-width: 200px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff4757;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 50px;
  color: #6a4c41;
  font-family: "Arial", sans-serif;
`;

const RecipeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: red;
  margin-top: 20px;
`;

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes", error);
        setError(
          error.response?.data.message || "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe", error);
      setError("Failed to delete recipe. Please try again.");
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar />
      {error && <ErrorContainer>{error}</ErrorContainer>}
      {recipes.length === 0 ? (
        <NoRecipesMessage>No recipes found</NoRecipesMessage>
      ) : (
        <RecipeList>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={{
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
                  ? `/uploads/${recipe.image}`
                  : "path/to/default/image.jpg",
                ingredients: recipe.ingredients,
                preparation: recipe.preparation,
              }}
              onDelete={() => deleteRecipe(recipe.id)}
            />
          ))}
        </RecipeList>
      )}
      <Button to="/add-recipe">Add New Recipe</Button>
    </PageContainer>
  );
};

export default RecipesPage;
