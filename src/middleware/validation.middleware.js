import { validationResult } from "express-validator";

export const validationMiddleware = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Validation failed",
    });
  }

  next();
};