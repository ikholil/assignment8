import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { orderController } from './order.controller'

const router = express.Router()


router.get('/', auth(ENUM_USER_ROLE.ADMIN), orderController.getAllOrder)
router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER), orderController.createOrder)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), orderController.getSingleOrder)


export const orderRouter = router