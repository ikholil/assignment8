import express from 'express'
import { authController } from './auth.controller'
const router = express.Router()

router.post("/signup", authController.signUp)
router.post("/signin", authController.signIn)

export const AuthRouter = router