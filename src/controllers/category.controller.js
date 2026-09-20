import { prisma } from "../config/prisma.js";
import { customError } from "../middleware/error.middleware.js";

export const getCategories = async (request, response, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    response.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (request, response, next) => {
  const { id } = request.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      customError("Category not found", 404);
    }

    response.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
export const createCategory = async (request, response, next) => {
  try {
    const { name, description } = request.body;

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    response.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (request, response, next) => {
  const { id } = request.params;
  const { name } = request.body;

  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    response.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (request, response, next) => {
  const { id } = request.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      customError("Category not found", 404);
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    response.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
