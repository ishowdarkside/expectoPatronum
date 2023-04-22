const path = require("path");
exports.renderRegister = (req, res) => {
  const file = path.join(__dirname, "../../frontend/register.html");
  res.sendFile(file);
};

exports.renderLogin = (req, res) => {
  const file = path.join(__dirname, "../../frontend/login.html");
  res.sendFile(file);
};

exports.renderMain = (req, res) => {
  const file = path.join(__dirname, "../../frontend/main.html");
  res.sendFile(file);
};

exports.renderMe = (req, res) => {
  //const file = path.join(__dirname, "..", "views", "me");
  const file = path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    "templates",
    "settings.html"
  );
  //res.render(file);
  res.sendFile(file);
};
