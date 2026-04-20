const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkCookie } = require("./middlewares/user");
const { newUser } = require("./controllers/user");
const displayQuestion = require("./controllers/question");
const { recordResponse, getResults } = require("./controllers/userResponses");
const cors = require("cors");
const userResponses = require("./models/userResponses");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Examify1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/user", checkCookie, (req, res) => {
  res.json({ success: true });
});

app.post("/api/user", newUser);

app.get("/api/questions", displayQuestion);
app.post("/api/userResponse", recordResponse);
app.get("/api/results", getResults);

app.listen(8000, () => {
  console.log("Server Started");
});
