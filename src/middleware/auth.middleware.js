import { customError } from "./error.middleware.js";
import { checkJwtToken } from "../utils/jwtHelper.js";

export const checkAuthentication = (request, response, next) => {
  let token = request.headers.authorization;

  token = token?.split(" ")[1];

  if (!token) {
    customError("Please send token or login first", 401);
  }

  const verifiedToken = checkJwtToken(token);

  if (!verifiedToken) {
    customError("Your token is not valid", 401);
  }

  request.user = verifiedToken;

  console.log(verifiedToken);

  next();
};
