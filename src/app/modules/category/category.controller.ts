import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Category created successfully",
        data: result
    })
})

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategory()
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "categories retrieved successfully",
        data: result
    })
})
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.getSingleCategory(req.params.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "category retrieved successfully",
        data: result
    })
})
const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.updateCategory(req.params.id, req.body)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "category updated successfully",
        data: result
    })
})
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.deleteCategory(req.params.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "categories deleted successfully",
        data: result
    })
})

export const categoryController = {
    createCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory
}