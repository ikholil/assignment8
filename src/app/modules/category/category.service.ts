import { Category } from "@prisma/client"
import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import prisma from "../../../shared/prisma"


const createCategory = async (data: Category) => {
    const result = await prisma.category.create({ data })
    return result
}

const getAllCategory = async () => {
    const result = await prisma.category.findMany({})
    return result
}
const getSingleCategory = async (id: string) => {
    const result = await prisma.category.findUnique({ where: { id }, include: { book: true } })
    return result
}
const updateCategory = async (id: string, data: Partial<Category>) => {
    const isExist = await prisma.category.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category Not Found')
    }
    const result = await prisma.category.update({ where: { id }, data })
    return result
}
const deleteCategory = async (id: string) => {
    const isExist = await prisma.category.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category Not Found')
    }
    const result = await prisma.category.delete({ where: { id } })
    return result
}
export const categoryService = {
    getAllCategory, getSingleCategory, updateCategory, deleteCategory, createCategory
}