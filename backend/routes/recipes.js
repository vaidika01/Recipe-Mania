const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const { title, ingredients, preparation } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.filename : null;

    if (!title || !ingredients || !preparation) {
      return res
        .status(400)
        .json({ message: "Title, ingredients, and preparation are required" });
    }

    try {
      await pool.query(
        "INSERT INTO recipes (title, ingredients, preparation, image, user_id) VALUES ($1, $2, $3, $4, $5)",
        [title, ingredients, preparation, image, userId]
      );
      res.status(201).json({ message: "Recipe added successfully" });
    } catch (error) {
      console.error("Error adding recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Route to fetch a recipe by ID
router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, preparation } = req.body;
  const userId = req.user.id;

  if (!title || !ingredients || !preparation) {
    return res
      .status(400)
      .json({ message: "Title, ingredients, and preparation are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE recipes SET title = $1, ingredients = $2, preparation = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, ingredients, preparation, id, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Recipe not found or unauthorized" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING image",
      [id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const image = result.rows[0].image;
    if (image) {
      const fs = require("fs");
      const filePath = path.join("uploads", image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
