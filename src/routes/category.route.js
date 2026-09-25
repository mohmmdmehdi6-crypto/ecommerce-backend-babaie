import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { checkAuthentication } from "../middleware/auth.middleware.js";
import { checkAuthorizationAdmin } from "../middleware/authorization.middleware.js";
import { categoryValidator } from "../validators/category.validator.js";
import { checkValidation } from "../middleware/validation.middleware.js";
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

categoryRouter.get("/:id", getCategoryById);
categoryRouter.post(
  "/",
  checkAuthentication,
  checkAuthorizationAdmin,
  categoryValidator,
  checkValidation,
  createCategory,
);

categoryRouter.put(
  "/:id",
  checkAuthentication,
  checkAuthorizationAdmin,
  categoryValidator,
  checkValidation,
  updateCategory,
);
categoryRouter.delete(
  "/:id",
  checkAuthentication,
  checkAuthorizationAdmin,
  deleteCategory,
);

export { categoryRouter };
