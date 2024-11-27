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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevenue = exports.createOrder = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderData = order_validation_1.orderSchemaValidation.parse(req.body);
        const orderData = yield (0, order_service_1.createOrderIntoDB)(newOrderData);
        res.status(201).json({
            message: 'Order created successfully',
            status: true,
            success: true,
            data: orderData,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Order creation failed',
            status: false,
            success: false,
            error: error instanceof Error ? error.message : "Order creation failed",
            stack: error instanceof Error ? error.stack : "Order creation failed",
        });
    }
});
exports.createOrder = createOrder;
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield (0, order_service_1.calculateRevenue)();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            success: true,
            data: { totalRevenue },
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to calculate revenue',
            status: false,
            success: false,
            error: error,
            stack: error instanceof Error ? error.stack : "Failed to calculate revenue",
        });
    }
});
exports.getRevenue = getRevenue;
