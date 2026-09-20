import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { customError } from "../middleware/error.middleware.js";

export const register = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      customError("Email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    response.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      customError("User not found", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      customError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    response.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};
export const getProfile = async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: request.user.id },
      include: {
        userImages: true,
      },
    });

    if (!user) {
      customError("User not found", 404);
    }

    response.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        userImages: user.userImages,
      },
    });
  } catch (error) {
    next(error);
  }
};
