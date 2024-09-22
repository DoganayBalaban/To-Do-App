const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// @route  POST api/notes
// @desc   Create a note
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("body", "Body is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, body, tags } = req.body;
    try {
      const newNote = new Note({
        title,
        body,
        tags,
        user: req.user.id,
      });
      await newNote.save();
      res.json({ success: true, data: newNote });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  PUT api/notes/id
// @desc   Update a note
// @access Private
router.put(
  "/:id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("title", "Title is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, body, tags } = req.body;
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ msg: "Note not found" });
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(403).json({ msg: "Not authorized" });
      }
      note.title = title;
      note.body = body;
      note.tags = tags || note.tags;
      await note.save();
      res.json({ success: true, data: note });
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Note not found." });
      }
      res.status(500).send("Server error");
    }
  }
);
// @route  DELETE api/notes/id
// @desc   Delete a note
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }
    await note.deleteOne({ _id: req.params.id });
    res.status(204).json({ success: true, msg: "Note deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note not found." });
    }
    res.status(500).send("Server error");
  }
});

// @route  GET api/notes
// @desc   Get all notes
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id }).populate(
      "user",
      "name"
    );
    res.json({ success: true, data: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
