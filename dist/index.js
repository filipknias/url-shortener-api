"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const url_controller_1 = __importDefault(require("./controllers/url.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const redirect_controller_1 = __importDefault(require("./controllers/redirect.controller"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`);
mongoose_1.default.set('strictQuery', true);
const connection = mongoose_1.default.connection;
connection.on("error", console.error);
connection.once("open", () => {
    console.log("Connected successfully to MongoDB");
});
app.use(express_1.default.json());
app.use("/api/url", url_controller_1.default);
app.use("/api/auth", auth_controller_1.default);
app.use("/", redirect_controller_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
