const jwt = require("jsonwebtoken");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      errorName: err.name,
      errorMessage: err.message,
    });
  }
  if (process.env.NODE_ENV === "production") {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.redirect("/login");
    }

    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Email already in use!",
      });
    }

    if (err.errors?.name?.message === "Please provide full name") {
      return res.status(400).json({
        status: "fail",
        message: err.errors.name.message,
      });
    }
    if (err.errors?.passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: err.errors.passwordConfirm.message,
      });
    }
    if (err.errors?.password) {
      return res.status(400).json({
        status: "fail",
        message: err.errors.password.message,
      });
    }
    if (err.errors?.email.name === "ValidatorError") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Email",
      });
    }
    if (err.isOperational) {
      return res.status(statusCode).json({
        status: status,
        message: err.message,
      });
    } else
      return res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
  }
};

module.exports = errorMiddleware;
