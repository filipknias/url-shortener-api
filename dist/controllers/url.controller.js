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
const Url_1 = __importDefault(require("../models/Url"));
const View_1 = __importDefault(require("../models/View"));
const shortid_1 = __importDefault(require("shortid"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = (0, express_1.Router)();
// GET /api/url
// Get all url with views count
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield Url_1.default.find();
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
// GET /api/url/:id
// Get single url with views count
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const url = yield Url_1.default.findOne({ _id: id });
        if (url === null) {
            return res.json({ success: false, message: `Url with id: ${id} not found` }).status(404);
        }
        const viewsCount = yield View_1.default.find({ url_id: id }).count();
        res.json({ success: true, data: url, views: viewsCount }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
// POST /api/url
// Create url document
router.post("/", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { long_url, expires_at } = req.body;
        // Return long url if it exists in database arleady
        if (!expires_at && !req.user) {
            const longUrlPresent = yield Url_1.default.findOne({
                long_url,
                expires_at: { $exists: false },
                user_id: { $exists: false }
            });
            if (longUrlPresent) {
                return res.json({ success: true, data: longUrlPresent }).status(200);
            }
        }
        // Return long url if it exists in database arleady and user is authenticated
        if (req.user && !expires_at) {
            const userUrlPresent = yield Url_1.default.findOne({
                long_url,
                expires_at: { $exists: false },
                user_id: req.user.id,
            });
            if (userUrlPresent) {
                return res.json({ success: true, data: userUrlPresent }).status(200);
            }
        }
        // Create new url document
        const urlDocument = {
            long_url,
            short_url: shortid_1.default.generate()
        };
        if (expires_at) {
            const now = new Date();
            const expirationTime = new Date(expires_at);
            const timeDiff = expirationTime.getTime() - now.getTime();
            urlDocument.expires_at = new Date(now.getTime() + timeDiff);
        }
        if (req.user) {
            urlDocument.user_id = req.user.id;
        }
        const newUrl = new Url_1.default(urlDocument);
        const data = yield newUrl.save();
        res.json({ success: true, data }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
// PUT /api/url/:id
// Edit url document data
router.put("/:id", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { long_url, expires_at } = req.body;
        const url = yield Url_1.default.findByIdAndUpdate(req.params.id, { long_url, expires_at }, { new: true });
        res.json({ success: true, data: url }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
// DELETE /api/url/:id
// Delete url document
router.delete("/:id", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield Url_1.default.findByIdAndDelete(req.params.id);
        res.json({ success: true, url }).status(200);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
exports.default = router;
