"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchemaValidation = void 0;
const zod_1 = require("zod");
exports.orderSchemaValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    car: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    totalPrice: zod_1.z.number().positive(),
});
