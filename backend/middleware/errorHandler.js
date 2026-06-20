// middleware/errorHandler.js
// A global Express error-handling middleware.
// Catches any errors passed via next(error) and sends a clean JSON response.
// Mount this LAST in server.js, after all routes.

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
