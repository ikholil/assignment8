import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { bookController } from './book.controller'

const router = express.Router()


router.post('/create-book', auth(ENUM_USER_ROLE.ADMIN), bookController.createBook)
router.get('/', bookController.getAllBook)
router.get('/:id', bookController.getSingleBook)
router.get('/category/:categoryId', bookController.getBooksByCategoryId)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), bookController.updateBook)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), bookController.deleteBook)

export const bookRouter = router