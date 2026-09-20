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

export const getUserImage = async (request, response, next) => {
  try {
    const userImages = await prisma.userImage.findMany({
      where: {
        userId: request.user.id,
      },
    });
    response.status(200).json(userImages);
  } catch (error) {
    next(error);
  }
};
export const deleteUserImage = async (request, response, next) => {
  try {
    const { id } = request.params;

    const userImage = await prisma.userImage.findUnique({
      where: {
        id,
      },
    });

    if (!userImage) {
      customError("User image not found", 404);
    }

    if (userImage.userId !== request.user.id) {
      customError("You don't have access to this image", 403);
    }

    await prisma.userImage.delete({
      where: {
        id,
      },
    });

    response.status(200).json({
      message: "User image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
