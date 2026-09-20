import { prisma } from "../config/prisma.js";
import { customError } from "../middleware/error.middleware.js";

export const uploadUserImage = async (request, response, next) => {
  try {
    const image = request.file?.filename;
    if (!image) {
      customError("Please upload an image", 400);
    }
    const userImage = await prisma.userImage.create({
      data: {
        image,
        userId: request.user.id,
      },
    });
    response.status(201).json({
      success: true,
      data: userImage,
      message: "User image uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};
