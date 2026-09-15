import jwt from "jsonwebtoken";

export const authMiddleware = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded;

    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
