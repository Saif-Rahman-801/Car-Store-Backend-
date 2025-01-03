"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const CarSchema = new mongoose_1.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { timestamps: true });
exports.Car = (0, mongoose_1.model)('Car', CarSchema);
