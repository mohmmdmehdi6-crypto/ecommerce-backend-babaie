import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import { deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../utils/multer.utils.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", upload.single("image"), createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export { productRouter };
