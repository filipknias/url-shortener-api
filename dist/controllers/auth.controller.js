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
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const Url_1 = __importDefault(require("../models/Url"));
const View_1 = __importDefault(require("../models/View"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// POST /api/auth/register
// Create user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt();
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = new User_1.default({ email, hash });
        yield User_1.default.create({ email, hash });
        res.json({ success: true, data: user }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
// POST /api/auth/sign-in
// Assign JWT token and return user data
router.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check for user email and password
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Wrong email or password" }).status(400);
        }
        const authSuccess = yield bcrypt_1.default.compare(password, user.hash);
        if (!authSuccess) {
            return res.json({ success: false, message: "Wrong email or password" }).status(400);
        }
        // Assign JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.json({ success: false, message: "JWT_SECRET not set" }).status(400);
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, jwtSecret);
        // Find user in database
        res.json({ success: true, data: { token, user } }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
// TODO: move to different controller
// GET /api/auth/urls
// Get urls created by current logged in user
router.get("/urls", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find user related urls
        const urls = yield Url_1.default.find({ user_id: req.user.id });
        // Find urls related views
        const urlsWithViews = [];
        for (const url of urls) {
            const viewsCount = yield View_1.default.find({ url_id: url._id }).count();
            urlsWithViews.push(Object.assign(Object.assign({}, url.toObject()), { views: viewsCount }));
        }
        res.json({ success: true, data: urlsWithViews }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
exports.default = router;
