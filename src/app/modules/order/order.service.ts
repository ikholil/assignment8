import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";


const createOrder = async (userId: string, orderedBooks: any) => {
    const order = await prisma.order.create({
        data: { userId: userId, orderedBooks: orderedBooks as Prisma.JsonArray }

    });
    return order
}

const getAllOrder = async () => {
    const result = await prisma.order.findMany({})
    return result
}
const getSpecificOrder = async (userId: string) => {
    const result = await prisma.order.findMany({ where: { userId } })
    return result
}
const getSingleOrder = async (orderId: string, user: { role: string, id: string }) => {

    let result = await prisma.order.findUnique({ where: { id: orderId } })
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No order found')
    }
    if (user.role == "admin") {
        return result
    }
    if (user.id !== result?.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized')
    }

    return result
}
export const orderService = {
    getAllOrder, getSpecificOrder, createOrder, getSingleOrder
}