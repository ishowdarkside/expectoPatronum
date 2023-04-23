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
  const file = path.join(__dirname, "..", "views", "main");
  res.render(file, { user: req.user });
};

exports.renderMe = (req, res) => {
  const file = path.join(__dirname, "..", "views", "settings");
  res.render(file, { user: req.user });

  /*const file = path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    "templates",
    "settings.html"
  );
  res.sendFile(file);*/
};
