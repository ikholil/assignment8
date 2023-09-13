import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";

const signUp = async (data: User) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const withHashedPassword = {
        ...data,
        password: hashedPassword
    }
    const result = await prisma.user.create({ data: withHashedPassword })
    return result
}

const signIn = async (data: Partial<User>) => {
    const isExist = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found')
    }
    const passwordMatched = await bcrypt.compare(data.password?.trim() as string, isExist.password)
    if (!passwordMatched) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect Password')
    }
    const { id, role } = isExist
    const accessToken = jwtHelpers.createToken(
        { id, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { id, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
}


export const authService = {
    signUp, signIn
}

