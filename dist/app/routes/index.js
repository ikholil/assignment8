"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/users",
        route: user_route_1.userRouter
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRouter
    },
    {
        path: "/categories",
        route: category_route_1.categoryRouter
    },
    {
        path: "/books",
        route: book_route_1.bookRouter
    },
    {
        path: "/orders",
        route: order_route_1.orderRouter
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
