"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const car_route_1 = require("./modules/Car/car.route");
const order_route_1 = require("./modules/Order/order.route");
const app = (0, express_1.default)();
// perser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// App routes
app.use('/api/cars', car_route_1.CarRoutes);
app.use('/api/orders', order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Car Store API!");
});
exports.default = app;
