import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.service";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUser()
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "users retrieved successfully",
        data: result
    })
})
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getSingleUser(req.params.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "user retrieved successfully",
        data: result
    })
})
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "user updated successfully",
        data: result
    })
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "users deleted successfully",
        data: result
    })
})
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getUserProfile(req.user?.id)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "User Profile data retrieved successfully",
        data: result
    })
})
export const userController = {
    getAllUser, getSingleUser, updateUser, deleteUser, getUserProfile
}