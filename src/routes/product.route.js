import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import { deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../utils/multer.utils.js";
import { checkAuthorizationAdmin } from "../middleware/authorization.middleware.js";
import { checkAuthentication } from "../middleware/auth.middleware.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  checkAuthentication,
  checkAuthorizationAdmin,
  upload.single("image"),
  createProduct,
);
productRouter.put(
  "/:id",
  checkAuthentication,
  checkAuthorizationAdmin,
  updateProduct,
);
productRouter.delete(
  "/:id",
  checkAuthentication,
  checkAuthorizationAdmin,
  deleteProduct,
);

export { productRouter };
