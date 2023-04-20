const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: err.stack,
    });

    if (process.env.NODE_ENV === "production") {
      if (err.isOperational) {
        res.status(statusCode).json({
          status: status,
          message: err.message,
        });
      } else
        res.status(500).json({
          status: "error",
          message: "Something went very wrong!",
        });
    }
  }
};

module.exports = errorMiddleware;
