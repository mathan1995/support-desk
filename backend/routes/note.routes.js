const express = require("express");
const { getNotes, createNote } = require("../controllers/note.controller");
const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth.middleware");

router.route("/").get(protect, getNotes).post(protect, createNote);

module.exports = router;
