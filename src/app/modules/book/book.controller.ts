import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { bookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.createBook(req.body)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Book created successfully",
        data: result
    })
})
const getAllBook = catchAsync(async (req: Request, res: Response) => {

    const result = await bookService.getAllBook(req.query)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Books retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})
const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.getBooksbyCategory(req.params.categoryId)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Book retrieved successfully",
        data: result
    })
})
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.getSingleBook(req.params.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Book retrieved successfully",
        data: result
    })
})
const updateBook = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.updateBook(req.params.id, req.body)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Book updated successfully",
        data: result
    })
})
const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const result = await bookService.deleteBook(req.params.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "categories deleted successfully",
        data: result
    })
})

export const bookController = {
    createBook, getAllBook, getSingleBook, updateBook, deleteBook, getBooksByCategoryId
}