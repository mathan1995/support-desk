const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const Ticket = require("../models/Ticket.model");

// @desc    Get user tickets
// @router  GET /api/tickets
// @access  Private
exports.getTickets = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get user tickets
// @router  POST /api/tickets
// @access  Private
exports.createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc    Get user ticket
// @router  GET /api/tickets/:id
// @access  Private
exports.getTicketById = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  res.status(200).json(ticket);
});

// @desc    Delete ticket
// @router  DELETE /api/tickets/:id
// @access  Private
exports.deleteTicketById = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc    Update ticket
// @router  PUT /api/tickets/:id
// @access  Private
exports.updateTicketById = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found!!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized!");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});
