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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.create({
        data: { userId: userId, orderedBooks: orderedBooks }
    });
    return order;
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({});
    return result;
});
const getSpecificOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({ where: { userId } });
    return result;
});
const getSingleOrder = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield prisma_1.default.order.findUnique({ where: { id: orderId } });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No order found');
    }
    if (user.role == "admin") {
        return result;
    }
    if (user.id !== (result === null || result === void 0 ? void 0 : result.userId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not authorized');
    }
    return result;
});
exports.orderService = {
    getAllOrder, getSpecificOrder, createOrder, getSingleOrder
};
