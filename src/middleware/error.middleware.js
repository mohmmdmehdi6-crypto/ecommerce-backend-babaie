export const errorHandler = (error, request, response, next) => {
  console.log(error);

  response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
