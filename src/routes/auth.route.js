import express from "express";

import { getProfile, login, register } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator.js";
import { validationMiddleware } from "../middleware/validation.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerValidation,
  validationMiddleware,
  register,
);

authRouter.post("/login", loginValidation, validationMiddleware, login);

authRouter.get("/profile", authMiddleware, getProfile);  
export { authRouter };
