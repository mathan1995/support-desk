const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const Note = require("../models/Note.model");
const Ticket = require("../models/Ticket.model");

// @desc    Get Notes for given ticket
// @router  GET /api/tickets/:ticketId/notes
// @access  Private
exports.getNotes = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.findById(ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized!!");
  }

  const notes = await Note.find({ ticket: ticketId });

  res.status(200).json(notes);
});

// @desc    Create Note for given ticket
// @router  POST /api/tickets/:ticketId/notes
// @access  Private
exports.createNote = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.findById(ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized!!");
  }

  const { text } = req.body;

  const note = await Note.create({ user: user._id, ticket: ticketId, text });

  res.status(201).json(note);
});
