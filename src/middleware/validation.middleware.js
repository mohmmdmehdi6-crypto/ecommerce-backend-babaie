import { validationResult } from "express-validator";

export const checkValidation = (request, response, next) => {
  const err = validationResult(request);

  if (!err.isEmpty()) {
    return response.status(422).send(err);
  }

  next();
};
