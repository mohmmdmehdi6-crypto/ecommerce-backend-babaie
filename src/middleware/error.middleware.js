export const customError = (message = "Internal error", statusCode = 500) => {
  const newError = new Error(message);

  newError.statusCode = statusCode;

  throw newError;
};

export const errorHandler = (error, request, response, next) => {
  console.log(error);

  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
