
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    error: err.name,
    timeStamp: new Date().toISOString()
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
