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
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const auth_service_1 = require("./auth.service");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.signUp(req.body);
        res.json({
            success: true,
            statusCode: http_status_1.default.ok,
            message: "User Created Successfully",
            data: result
        });
    }
    catch (err) {
        console.log(err);
    }
});
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.signIn(req.body);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', result === null || result === void 0 ? void 0 : result.refreshToken, cookieOptions);
        res.json({
            success: true,
            statusCode: http_status_1.default.ok,
            message: "User Logged in Successfully",
            token: result === null || result === void 0 ? void 0 : result.accessToken
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.authController = {
    signUp, signIn
};
