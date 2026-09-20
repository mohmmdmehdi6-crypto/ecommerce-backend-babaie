import express from "express";

import { getProfile, login, register } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator.js";
import { checkValidation } from "../middleware/validation.middleware.js";
import { checkAuthentication } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, checkValidation, register);

authRouter.post("/login", loginValidation, checkValidation, login);

authRouter.get("/profile", checkAuthentication, getProfile);

export { authRouter };
