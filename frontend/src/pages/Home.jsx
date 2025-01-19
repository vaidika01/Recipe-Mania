import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import recipesData from "../data";

const HomeContainer = styled.div`
  padding: 0;
  text-align: center;
  overflow-x: hidden;
  background-color: #faf3e0;
`;

const WelcomeBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: #faf3e0;
  padding: 40px 20px;
  color: #333333;
  text-align: center;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 30px 15px;
  }
`;

const WelcomeMessage = styled.h2`
  margin-bottom: 10px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #6a4c41;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #6a4c41;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CallToAction = styled.div`
  margin: 30px 0;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const CTAButton = styled(Link)`
  padding: 12px 24px;
  background-color: #ff6b6b;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff4757;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 14px;
  }
`;

const FeatureHighlights = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px auto;
  padding: 0;
  gap: 20px;
  max-width: 1200px;

  @media (max-width: 768px) {
    gap: 15px;
    margin: 20px 15px;
  }
`;

const Feature = styled.div`
  width: 30%;
  text-align: center;
  background-color: #fffaf4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 10px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1024px) {
    width: 45%;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const FeatureIcon = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
  color: #ff6b6b;
`;

const FeatureText = styled.p`
  font-size: 16px;
  color: #6a4c41;
  line-height: 1.5;
`;

const SampleRecipes = styled.div`
  margin: 40px 20px;
  padding: 40px;
  background-color: #fffaf4;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`;

const Dish = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Home = ({ isLoggedIn, userName }) => {
  return (
    <HomeContainer>
      <Navbar />
      <WelcomeBanner>
        <WelcomeMessage>Welcome to Recipe Mania!</WelcomeMessage>
        <Description>
          Save and manage your favorite recipes effortlessly.
        </Description>
        <CallToAction>
          <CTAButton to="/register">Sign Up</CTAButton>
          <CTAButton to="/login">Login</CTAButton>
        </CallToAction>
      </WelcomeBanner>
      <FeatureHighlights>
        <Feature>
          <FeatureIcon>🍲</FeatureIcon>
          <FeatureText>Organize your recipes in one place.</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>📝</FeatureIcon>
          <FeatureText>Easily add, update, and delete recipes.</FeatureText>
        </Feature>
      </FeatureHighlights>
      <SampleRecipes>
        <h3>Sample Recipes</h3>
        <Dish>
          {recipesData.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Dish>
      </SampleRecipes>
    </HomeContainer>
  );
};

export default Home;
