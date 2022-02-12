"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
let port = process.env.PORT || 5000;
let app = (0, express_1.default)();
let guestsRouter = require("../routes/guestsRouter");
let reservationsRouter = require("../routes/reservationsRouter");
let roomsRouter = require("../routes/roomsRouter");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.static("public"));
app.use("/guests", guestsRouter);
app.use("/reservations", reservationsRouter);
app.use("/rooms", roomsRouter);
mongoose_1.default
    .connect("mongodb://0.0.0.0:27017/The-Big-Hotel")
    .then(() => {
    app.listen(port, () => {
        console.info(`start server start listening on port ${port}`);
    });
})
    .catch((err) => console.error(err));
