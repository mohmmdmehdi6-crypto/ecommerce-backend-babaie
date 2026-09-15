import { prisma } from "../config/prisma.js";

export const getProducts = async (request, response, next) => {
  try {
    const products = await prisma.product.findMany({
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
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
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
      return response.status(404).json({
        success: false,
        message: "Product not found",
      });
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
