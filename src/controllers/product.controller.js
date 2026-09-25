import { prisma } from "../config/prisma.js";
import { customError } from "../middleware/error.middleware.js";

export const getProducts = async (request, response, next) => {
  try {
    const { price, search } = request.query;

    const products = await prisma.product.findMany({
      where: {
        ...(price && {
          price: Number(price),
        }),

        ...(search && {
          name: {
            contains: search,
          },
        }),
      },
      include: {
        category: true,
      },
    });

    response.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (request, response, next) => {
  const { id } = request.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      customError("Product not found", 404);
    }

    response.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (request, response, next) => {
  const { name, description, price, stock, categoryId } = request.body;

  const image = request.file?.filename;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      customError("Category not found", 404);
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        image,
      },
    });

    response.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (request, response, next) => {
  const { id } = request.params;
  const { name, description, price, stock, categoryId } = request.body;

  const image = request.file?.filename;

  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        ...(image && {
          image,
        }),
      },
    });

    response.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (request, response, next) => {
  const { id } = request.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      customError("Product not found", 404);
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    response.status(200).json({
      success: true,
      data: null,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
