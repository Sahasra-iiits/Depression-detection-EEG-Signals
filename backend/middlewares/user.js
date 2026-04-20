const { getUser } = require("../controllers/user");

async function checkCookie(req, res, next) {
  const id = req.cookies?.uid;
  if (!id) {
    return res.json({ success: false });
  }
  const user = await getUser(id);
  if (!user) {
    return res.json({ success: false });
  }
  next();
}

module.exports = {
  checkCookie,
};
