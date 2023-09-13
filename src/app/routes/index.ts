import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { bookRouter } from '../modules/book/book.route';
import { categoryRouter } from '../modules/category/category.route';
import { orderRouter } from '../modules/order/order.route';
import { userRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/users",
    route: userRouter
  },
  {
    path: "/auth",
    route: AuthRouter
  },
  {
    path: "/categories",
    route: categoryRouter
  },
  {
    path: "/books",
    route: bookRouter
  },
  {
    path: "/orders",
    route: orderRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
