const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

module.exports = router;