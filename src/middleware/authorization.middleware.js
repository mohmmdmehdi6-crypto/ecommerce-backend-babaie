import { customError } from "./error.middleware.js";

export const checkAuthorization = (request, response, next, role) => {
  const user = request.user;

  if (!user) {
    customError("User token is not valid", 401);
  }

  if (user.role !== role) {
    customError("You don't have access for this action", 403);
  }

  next();
};

export const checkAuthorizationAdmin = (request, response, next) => {
  checkAuthorization(request, response, next, "ADMIN");
};
