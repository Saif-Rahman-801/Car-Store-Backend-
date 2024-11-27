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
exports.updateCarInDB = exports.getSingleCarFromDB = exports.getAllCarsFromDB = exports.createACartoDB = void 0;
const mongoose_1 = require("mongoose");
const car_model_1 = require("./car.model");
const createACartoDB = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.create(carData);
});
exports.createACartoDB = createACartoDB;
const getAllCarsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (searchTerm) {
        filter.$or = [
            { brand: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
            { model: { $regex: searchTerm, $options: 'i' } },
        ];
    }
    //   console.log(filter);
    return yield car_model_1.Car.find(filter);
});
exports.getAllCarsFromDB = getAllCarsFromDB;
const getSingleCarFromDB = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(carId)) {
        throw new Error('Invalid car ID');
    }
    return yield car_model_1.Car.findById(carId);
});
exports.getSingleCarFromDB = getSingleCarFromDB;
const updateCarInDB = (carId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(carId)) {
        throw new Error('Invalid car ID');
    }
    const updatedCar = yield car_model_1.Car.findByIdAndUpdate(carId, updateData, {
        new: true,
    });
    if (!updatedCar) {
        throw new Error('Car not found');
    }
    return updatedCar;
});
exports.updateCarInDB = updateCarInDB;
