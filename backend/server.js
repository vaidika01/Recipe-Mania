const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const authenticateToken = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const allowedOrigins = [
  'http://localhost:3000', 
  'https://recipe-mania-frontend.onrender.com',
];

app.use(
  cors({
    origin: allowedOrigins, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", authenticateToken, recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
