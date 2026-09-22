const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

async function newUser(req, res) {
  const id = uuidv4();
  const { fullname, age } = req.body;
  await User.create({
    userId: id,
    fullName: fullname,
    age: age,
  });
  res.cookie("uid", id, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ success: true });
}

async function getUser(userId) {
  const user = await User.findOne({ userId });
  return user;
}

module.exports = {
  newUser,
  getUser,
};
