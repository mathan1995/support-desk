require("dotenv").config();
const colors = require("colors");
const express = require("express");
const { errorHandler } = require("./middleware/error.middleware");
const connectDB = require("./config/db");

// Mongo DB connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to support desk" });
});

app.use("/api/users", require("./routes/user.route"));

app.get("*", (req, res) => {
  res.status(404).json({ message: "Error in finding route" });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (!err) console.log(`Server is running at port :: ${port}`);
});
