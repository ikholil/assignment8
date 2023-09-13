import { Book } from "@prisma/client"
import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import prisma from "../../../shared/prisma"
type queryOptions = {
    page?: string;
    size?: string;
    sortBy?: string;
    sortOrder?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    search?: string
}
const createBook = async (data: Book) => {
    const result = await prisma.book.create({ data, include: { category: true } },)
    return result
}

const getAllBook = async (queries: queryOptions) => {
    const { page, size, sortBy, sortOrder, minPrice, maxPrice, category, search } = queries;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(size as string) || 10;

    let filters: any = {};

    // Apply filters based on query parameters
    if (minPrice) {
        filters.price = {
            gte: parseFloat(minPrice),
        };
    }

    if (maxPrice) {
        filters.price = {
            ...(filters.price || {}),
            lte: parseFloat(maxPrice),
        };
    }

    if (category) {
        filters.category = {
            title: category
        }
    }

    // Apply search filter
    if (search) {
        filters.OR = [
            {
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            {
                author: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            {
                genre: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
        ];
    }

    const orderBy: any = {};

    // Apply sorting based on sortBy and sortOrder parameters
    if (sortBy && sortOrder) {
        orderBy[sortBy] = sortOrder.toLowerCase();
    }

    const books = await prisma.book.findMany({
        where: filters,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        include: {
            category: true,
        },
        orderBy,
    });

    const totalBooks = await prisma.book.count({
        where: filters,
    });

    return {
        meta: {
            page: pageNumber,
            size: pageSize,
            total: totalBooks,
            totalPage: Math.ceil(totalBooks / pageSize),
        },
        data: books,
    }
}
const getSingleBook = async (id: string) => {
    const result = await prisma.book.findUnique({ where: { id } })
    return result
}
const getBooksbyCategory = async (categoryId: string) => {
    console.log(categoryId)
    const result = await prisma.book.findMany({ where: { categoryId } })
    return result
}
const updateBook = async (id: string, data: Partial<Book>) => {
    const isExist = await prisma.book.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'book Not Found')
    }
    const result = await prisma.book.update({ where: { id }, data })
    return result
}
const deleteBook = async (id: string) => {
    const isExist = await prisma.book.findUnique({ where: { id } })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'book Not Found')
    }
    const result = await prisma.book.delete({ where: { id } })
    return result
}
export const bookService = {
    getAllBook, getSingleBook, updateBook, deleteBook, createBook, getBooksbyCategory
}