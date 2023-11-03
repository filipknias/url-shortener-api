"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }
    // Extract JWT token from authorization header
    const token = authHeader.substring('Bearer '.length);
    try {
        // Verify JWT token and extract user ID
        if (process.env.JWT_SECRET) {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
        }
    }
    catch (error) {
        console.error(error);
    }
    next();
};
