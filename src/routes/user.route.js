import express from "express";
import { uploadUserImage } from "../controllers/user.controller.js";
import { checkAuthentication } from "../middleware/auth.middleware.js";
import { uploadUser } from "../utils/multer.utils.js";

const userRouter = express.Router();

userRouter.post(
  "/images",
  checkAuthentication,
  uploadUser.single("image"),
  uploadUserImage,
);

export { userRouter };
