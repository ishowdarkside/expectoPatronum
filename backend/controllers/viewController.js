const path = require("path");
exports.renderRegister = (req, res) => {
  const file = path.join(__dirname, "../../frontend/register.html");
  res.sendFile(file);
};

exports.renderLogin = (req, res) => {
  const file = path.join(__dirname, "../../frontend/login.html");
  res.sendFile(file);
};
