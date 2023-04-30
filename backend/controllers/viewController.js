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
  console.log(req.user);
  res.render(file, { user: req.user, posts: req.posts, ceo: req.ceo });
};

exports.renderSettings = (req, res) => {
  const file = path.join(__dirname, "..", "views", "settings");
  res.render(file, { user: req.user, ceo: req.ceo });

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
  res.render(file, { user: req.user, ceo: req.ceo });

  /*
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "templates", "me.html")
  );*/
};

exports.renderCreatePost = (req, res) => {
  const file = path.join(__dirname, "..", "views", "createPost");
  res.render(file, { user: req.user, ceo: req.ceo });
};

exports.renderFindUser = (req, res) => {
  const file = path.join(__dirname, "..", "views", "findUsers");
  res.render(file, {
    user: req.user,
    searchResults: req.searchResults,
    searchQuery: req.query.search,
    ceo: req.ceo,
  });
};

exports.renderSearchedUser = (req, res) => {
  const file = path.join(__dirname, "..", "views", "specificUser");
  res.render(file, {
    user: req.user,
    searchUserData: req.searchUserData,
    isPrivate: req.isPrivate,
    ceo: req.ceo,
  });
};

exports.renderNotifications = (req, res) => {
  const file = path.join(__dirname, "..", "views", "notifications");

  res.render(file, {
    user: req.user,
    followRequests: req.followRequests,
    ceo: req.ceo,
  });
};

exports.renderPost = (req, res) => {
  const file = path.join(__dirname, "..", "views", "specificPost");

  res.render(file, { user: req.user, postData: req.postData, ceo: req.ceo });
};
