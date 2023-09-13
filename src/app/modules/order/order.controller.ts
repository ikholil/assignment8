import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {

    const result = await orderService.createOrder(req.user?.id, req.body?.orderedBooks)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Order created successfully",
        data: result
    })
})

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
    let result;
    if (req.user?.role === "admin") {
        result = await orderService.getAllOrder()
    } else {
        result = await orderService.getSpecificOrder(req.user?.id)
    }
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Orders retrieved successfully",
        data: result
    })
})

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const userData = { role: req.user?.role, id: req.user?.id }
    const result = await orderService.getSingleOrder(req.params?.id, userData)
    res.json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Order retrieved successfully",
        data: result
    })
})


export const orderController = {
    createOrder, getAllOrder, getSingleOrder
}