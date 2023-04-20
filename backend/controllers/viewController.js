const path = require("path");
exports.renderRegister = (req, res) => {
  const file = path.join(__dirname, "../../frontend/register.html");
  res.sendFile(file);
};
