import { prisma } from "../config/prisma.js";
import { customError } from "../middleware/error.middleware.js";

export const getFavorites = async (request, response, next) => {
  try {
    const favorites = await prisma.favorites.findMany({
      where: {
        userId: request.user.id,
      },
      include: {
        product: true,
      },
    });

    response.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (request, response, next) => {
  try {
    const { productId } = request.body;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      customError("Product not found", 404);
    }
    const favorite = await prisma.favorites.create({
      data: {
        userId: request.user.id,
        productId,
      },
    });
    response.status(201).json(favorite);
  } catch (error) {
    next(error);
  }
};
export const removeFavorite = async (request, response, next) => {
  try {
    const { productId } = request.params;

    const favorite = await prisma.favorites.findUnique({
      where: {
        userId_productId: {
          userId: request.user.id,
          productId,
        },
      },
    });

    if (!favorite) {
      customError("Favorite not found", 404);
    }

    await prisma.favorites.delete({
      where: {
        userId_productId: {
          userId: request.user.id,
          productId,
        },
      },
    });

    response.status(200).json({
      message: "Favorite removed successfully",
    });
  } catch (error) {
    next(error);
  }
};
