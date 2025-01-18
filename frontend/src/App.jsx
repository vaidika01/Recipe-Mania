import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import AddRecipePage from "./pages/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
