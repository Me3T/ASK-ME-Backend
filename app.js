const express = require("express");
const bodyParser = require("body-parser");
const Routes = require("./routes/Routes");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the App");
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.use("/api", Routes);
