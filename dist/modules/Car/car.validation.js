"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carUpdateSchemaValidation = exports.carSchemaValidation = void 0;
const zod_1 = require("zod");
exports.carSchemaValidation = zod_1.z.object({
    brand: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number().int().min(1886),
    price: zod_1.z.number().positive(),
    category: zod_1.z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
    description: zod_1.z.string(),
    quantity: zod_1.z.number().int().nonnegative(),
    inStock: zod_1.z.boolean(),
});
exports.carUpdateSchemaValidation = zod_1.z.object({
    price: zod_1.z.number().optional(),
    quantity: zod_1.z.number().optional(),
    brand: zod_1.z.string().optional(),
    model: zod_1.z.string().optional(),
    year: zod_1.z.number().optional(),
    category: zod_1.z
        .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'])
        .optional(),
    description: zod_1.z.string().optional(),
    inStock: zod_1.z.boolean().optional(),
});
