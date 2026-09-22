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
const PORT = process.env.PORT || 8000;

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

mongoose.connection.once("open", () => {
  console.log("Connected DB:", mongoose.connection.name);
});
app.use(express.json());
app.use(cookieParser());

app.get("/api/user", checkCookie, (req, res) => {
  res.json({ success: true });
});

app.post("/api/user", newUser);

app.get("/api/questions", displayQuestion);
app.post("/api/userResponse", recordResponse);
app.get("/api/results", getResults);

app.listen(PORT, () => {
  console.log("Server Started");
});
