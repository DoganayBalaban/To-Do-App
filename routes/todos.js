const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Todo = require("../models/To-do");
const auth = require("../middleware/auth");

// @route  POST api/todos
// @desc   Create a todo
// @access Private
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;
    try {
      const newTodo = new Todo({
        title,
        description,
        user: req.user.id,
      });
      await newTodo.save();
      res.json(newTodo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  PUT api/todos/id
// @desc   Update a todo
// @access Private
router.put(
  "/:id",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ msg: "To-do not found" });
      }
      if (todo.user.toString() !== req.user.id) {
        return res.status(403).json({ msg: "Not authorized" });
      }
      todo.title = title;
      todo.description = description;
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "To-do not found." });
      }
      res.status(500).send("Server error");
    }
  }
);

// @route  DELETE api/todos/id
// @desc   Delete a todo
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "To-do not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }
    await todo.deleteOne({ _id: req.params.id });
    res.status(204).json({ msg: "To-do deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "To-do not found." });
    }
    res.status(500).send("Server error");
  }
});

// @route  GET api/todos?page=1&limit=10
// @desc   Get a todos with pagination
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(10)
      .skip((req.query.page - 1) * 10);
    res.json(todos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
