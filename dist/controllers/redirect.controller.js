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
const ip_1 = __importDefault(require("ip"));
const router = (0, express_1.Router)();
// GET /:short_url
// Redirect user to long url website
router.get("/:short_url", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const short_url = req.params.short_url;
        const url = yield Url_1.default.findOne({ short_url });
        if (url === null) {
            return res.json({ success: false, message: `Url with short_url: ${short_url} not found` }).status(404);
        }
        // Register IP address website view
        const ipAddress = ip_1.default.address();
        // IP address database lookup
        const ipAddressPresent = yield View_1.default.findOne({ ip_address: ipAddress, url_id: url._id });
        if (!ipAddressPresent) {
            const view = new View_1.default({ ip_address: ipAddress, url_id: url._id });
            yield view.save();
        }
        res.redirect(`https://${url.long_url}`);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error }).status(500);
    }
}));
exports.default = router;
