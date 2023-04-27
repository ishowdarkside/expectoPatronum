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

exports.renderSettings = (req, res) => {
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

exports.renderMe = (req, res) => {
  const file = path.join(__dirname, "..", "views", "me");
  res.render(file, { user: req.user });

  /*
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "templates", "me.html")
  );*/
};

exports.renderCreatePost = (req, res) => {
  const file = path.join(__dirname, "..", "views", "createPost");
  res.render(file, { user: req.user });
};

exports.renderFindUser = (req, res) => {
  const file = path.join(__dirname, "..", "views", "findUsers");
  res.render(file, {
    user: req.user,
    searchResults: req.searchResults,
    searchQuery: req.query.search,
  });
};

exports.renderSearchedUser = (req, res) => {
  const file = path.join(__dirname, "..", "views", "specificUser");
  res.render(file, {
    user: req.user,
    searchUserData: req.searchUserData,
    isPrivate: req.isPrivate,
  });
};
