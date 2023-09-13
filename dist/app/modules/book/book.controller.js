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
exports.bookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.createBook(req.body);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book created successfully",
        data: result
    });
}));
const getAllBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.getAllBook(req.query);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Books retrieved successfully",
        meta: result.meta,
        data: result.data
    });
}));
const getBooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.getBooksbyCategory(req.params.categoryId);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book retrieved successfully",
        data: result
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.getSingleBook(req.params.id);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book retrieved successfully",
        data: result
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.updateBook(req.params.id, req.body);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book updated successfully",
        data: result
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.deleteBook(req.params.id);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "categories deleted successfully",
        data: result
    });
}));
exports.bookController = {
    createBook, getAllBook, getSingleBook, updateBook, deleteBook, getBooksByCategoryId
};
