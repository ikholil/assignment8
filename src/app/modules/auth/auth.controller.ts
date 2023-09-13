import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import { authService } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
    try {
        const result = await authService.signUp(req.body)
        res.json({
            success: true,
            statusCode: httpStatus.ok,
            message: "User Created Successfully",
            data: result
        })
    }
    catch (err) {
        console.log(err)
    }

}
const signIn = async (req: Request, res: Response) => {
    try {
        const result = await authService.signIn(req.body)
        const cookieOptions = {
            secure: config.env === 'production',
            httpOnly: true,
        };

        res.cookie('refreshToken', result?.refreshToken, cookieOptions);
        
        res.json({
            success: true,
            statusCode: httpStatus.ok,
            message: "User Logged in Successfully",
            token: result?.accessToken
        })
    } catch (error) {
        console.log(error)
    }
}
export const authController = {
    signUp, signIn
}