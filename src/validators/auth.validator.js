import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Email is not valid"),

  body("password")
    .isLength({ min: 8, max: 50 })
    .withMessage("Password must be between 8 and 50 characters"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email is not valid"),

  body("password").notEmpty().withMessage("Password is required"),
];
