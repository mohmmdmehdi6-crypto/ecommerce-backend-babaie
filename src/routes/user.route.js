import express from "express";
import {
  getUserImage,
  uploadUserImage,
  deleteUserImage,
} from "../controllers/user.controller.js";
import { checkAuthentication } from "../middleware/auth.middleware.js";
import { uploadUser } from "../utils/multer.utils.js";

const userRouter = express.Router();

userRouter.get("/images", checkAuthentication, getUserImage);

userRouter.post(
  "/images",
  checkAuthentication,
  uploadUser.single("image"),
  uploadUserImage,
);

userRouter.delete("/images/:id", checkAuthentication, deleteUserImage);
export { userRouter };
