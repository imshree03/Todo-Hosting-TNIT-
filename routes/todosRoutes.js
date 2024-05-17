const express = require("express");
const router = express.Router();
const {
  fetchTodos,
  createTodos,
  updateTodos,
  deleteTodos,
} = require("../controllers/todos");

router.get("/fetchTodos/:id", fetchTodos);
router.post("/createTodos", createTodos);
router.post("/updateTodos/:id", updateTodos);
router.delete("/deleteTodos/:id", deleteTodos);

module.exports = router;
