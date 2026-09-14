import { prisma } from "../config/prisma.js";

export const getCategories = async (request, response, next) => {
  try {
    const category = await prisma.category.findMany();
    response.status(200).json(category);
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
    });
    response.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (request, response, next) => {
  const { name } = request.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    response.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
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
    response.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully",
    });
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
      return response.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    response.status(200).json({
      success: true,
      data: null,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
