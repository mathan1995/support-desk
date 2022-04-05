require("dotenv").config();
const colors = require("colors");
const express = require("express");
const { errorHandler } = require("./middleware/error.middleware");
const connectDB = require("./config/db");
const path = require("path");

// Mongo DB connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/users", require("./routes/user.route"));
app.use("/api/tickets", require("./routes/ticket.route"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to support desk" });
  });

  app.get("*", (_, res) => {
    res.status(404).json({ message: "Error in finding route" });
  });
}
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (!err) console.log(`Server is running at port :: ${port}`);
});
