const express = require("express");
const {
  getTickets,
  createTicket,
  getTicketById,
  deleteTicketById,
  updateTicketById,
} = require("../controllers/ticket.controller");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const noteRouter = require("./note.routes");

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicketById)
  .delete(protect, deleteTicketById)
  .put(protect, updateTicketById);

router.use("/:ticketId/notes", noteRouter);

module.exports = router;
