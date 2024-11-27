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
exports.calculateRevenue = exports.createOrderIntoDB = void 0;
const mongoose_1 = require("mongoose");
const car_service_1 = require("../Car/car.service");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, car, quantity, totalPrice } = orderData;
    if (!mongoose_1.Types.ObjectId.isValid(car)) {
        throw new Error('Invalid car ID');
    }
    const checkIfCarAvailable = yield (0, car_service_1.getSingleCarFromDB)(car);
    if (!checkIfCarAvailable) {
        throw new Error('Car not found');
    }
    //   console.log(checkIfCarAvailable);
    if (checkIfCarAvailable.quantity < quantity) {
        throw new Error('Insufficiant stock, please reduce order quantity or request for stock');
    }
    checkIfCarAvailable.quantity -= quantity;
    checkIfCarAvailable.inStock = checkIfCarAvailable.quantity > 0;
    yield checkIfCarAvailable.save();
    return yield order_model_1.Order.create({ email, car, quantity, totalPrice });
});
exports.createOrderIntoDB = createOrderIntoDB;
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
            }
        }
    ]);
    // console.log(result);
    return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.calculateRevenue = calculateRevenue;
