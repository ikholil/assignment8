import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { userController } from './user.controller'

const router = express.Router()


router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUser)
router.get('/profile', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), userController.getUserProfile)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getSingleUser)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.updateUser)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser)

export const userRouter = router