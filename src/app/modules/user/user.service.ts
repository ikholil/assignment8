import { User } from "@prisma/client"
import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import prisma from "../../../shared/prisma"

const getAllUser = async () => {
    const result = await prisma.user.findMany({})
    return result
}
const getSingleUser = async (id: string) => {
    const result = await prisma.user.findUnique({ where: { id } })
    return result
}
const updateUser = async (id: string, data: Partial<User>) => {
    const isExist = await prisma.user.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
    }
    const result = await prisma.user.update({ where: { id }, data })
    return result
}
const deleteUser = async (id: string) => {
    const isExist = await prisma.user.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
    }
    const result = await prisma.user.delete({ where: { id } })
    return result
}
const getUserProfile = async (id: string) => {
    const result = await prisma.user.findUnique({ where: { id } })
    return result
}
export const userService = {
    getAllUser, getSingleUser, updateUser, deleteUser, getUserProfile
}