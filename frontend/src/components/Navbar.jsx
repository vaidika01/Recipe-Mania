import React from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const StyledNavbar = styled.nav`
  background-color: #fffaf4;
  color: #6a4c41;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 15px;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 28px;
  margin: 0;
  color: #6a4c41;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoutIcon = styled(FaSignOutAlt)`
  color: #6a4c41;
  font-size: 28px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isHomepage = location.pathname === "/";
  const isRecipesPage = location.pathname === "/recipes";
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <StyledNavbar>
      <LogoLink to="/">
        <Logo>RECIPE MANIA</Logo>
      </LogoLink>
      <MenuItem>
        {isLoggedIn && !isRecipesPage && (
          <StyledLink to="/recipes" aria-label="My Recipes">
            <span>My Recipes</span>
          </StyledLink>
        )}
        {!isHomepage && (
          <LogoutIcon onClick={handleLogout} aria-label="Logout" />
        )}
      </MenuItem>
    </StyledNavbar>
  );
};

export default Navbar;
