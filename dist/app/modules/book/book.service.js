"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({ data, include: { category: true } });
    return result;
});
const getAllBook = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, sortBy, sortOrder, minPrice, maxPrice, category, search } = queries;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(size) || 10;
    let filters = {};
    // Apply filters based on query parameters
    if (minPrice) {
        filters.price = {
            gte: parseFloat(minPrice),
        };
    }
    if (maxPrice) {
        filters.price = Object.assign(Object.assign({}, (filters.price || {})), { lte: parseFloat(maxPrice) });
    }
    if (category) {
        filters.category = {
            title: category
        };
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
    const orderBy = {};
    // Apply sorting based on sortBy and sortOrder parameters
    if (sortBy && sortOrder) {
        orderBy[sortBy] = sortOrder.toLowerCase();
    }
    const books = yield prisma_1.default.book.findMany({
        where: filters,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        include: {
            category: true,
        },
        orderBy,
    });
    const totalBooks = yield prisma_1.default.book.count({
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
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({ where: { id } });
    return result;
});
const getBooksbyCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(categoryId);
    const result = yield prisma_1.default.book.findMany({ where: { categoryId } });
    return result;
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'book Not Found');
    }
    const result = yield prisma_1.default.book.update({ where: { id }, data });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findUnique({ where: { id } });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'book Not Found');
    }
    const result = yield prisma_1.default.book.delete({ where: { id } });
    return result;
});
exports.bookService = {
    getAllBook, getSingleBook, updateBook, deleteBook, createBook, getBooksbyCategory
};
