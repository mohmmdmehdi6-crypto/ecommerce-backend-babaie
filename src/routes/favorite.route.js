import express from "express";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favorites.controller.js";

import { checkAuthentication } from "../middleware/auth.middleware.js";
import { favoriteValidator } from "../validators/favorite.validator.js";
import { checkValidation } from "../middleware/validation.middleware.js";

const favoriteRouter = express.Router();

favoriteRouter.post(
  "/",
  checkAuthentication,
  favoriteValidator,
  checkValidation,
  addFavorite,
);

favoriteRouter.get("/", checkAuthentication, getFavorites);

favoriteRouter.delete("/:productId", checkAuthentication, removeFavorite);

export { favoriteRouter };
