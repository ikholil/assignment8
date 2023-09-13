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
exports.orderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield order_service_1.orderService.createOrder((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, (_b = req.body) === null || _b === void 0 ? void 0 : _b.orderedBooks);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order created successfully",
        data: result
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    let result;
    if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.role) === "admin") {
        result = yield order_service_1.orderService.getAllOrder();
    }
    else {
        result = yield order_service_1.orderService.getSpecificOrder((_d = req.user) === null || _d === void 0 ? void 0 : _d.id);
    }
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders retrieved successfully",
        data: result
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const userData = { role: (_e = req.user) === null || _e === void 0 ? void 0 : _e.role, id: (_f = req.user) === null || _f === void 0 ? void 0 : _f.id };
    const result = yield order_service_1.orderService.getSingleOrder((_g = req.params) === null || _g === void 0 ? void 0 : _g.id, userData);
    res.json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order retrieved successfully",
        data: result
    });
}));
exports.orderController = {
    createOrder, getAllOrder, getSingleOrder
};
