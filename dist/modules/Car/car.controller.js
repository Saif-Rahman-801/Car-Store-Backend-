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
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const car_validation_1 = require("./car.validation");
const car_service_1 = require("./car.service");
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = car_validation_1.carSchemaValidation.parse(req.body);
        const createdCarData = yield (0, car_service_1.createACartoDB)(carData);
        res.status(200).json({
            message: 'Car created successfully',
            success: true,
            data: createdCarData,
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Car creation failed',
            success: false,
            error: error,
            stack: error instanceof Error ? error.stack : 'car creation failed',
        });
    }
});
exports.createCar = createCar;
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        // console.log(searchTerm);
        const cars = yield (0, car_service_1.getAllCarsFromDB)(searchTerm);
        // console.log(cars);
        res.status(200).json({
            message: 'Cars retrieved successfully',
            success: true,
            status: true,
            data: cars,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Car loading failed; not found',
            success: false,
            error: error instanceof Error ? error.message : 'Car not found',
            stack: error instanceof Error ? error.stack : 'Car not found',
        });
    }
});
exports.getAllCars = getAllCars;
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield (0, car_service_1.getSingleCarFromDB)(carId);
        res.status(200).json({
            message: 'Car retrieved successfully',
            success: true,
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Error retrieving car',
            status: false,
            success: false,
            error: error instanceof Error
                ? error.message
                : 'Car not found, error finding car',
            stack: error instanceof Error ? error.stack : 'Car not found',
        });
    }
});
exports.getCarById = getCarById;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const updateCarData = car_validation_1.carUpdateSchemaValidation.parse(req.body);
        const result = yield (0, car_service_1.updateCarInDB)(carId, updateCarData);
        res.status(200).json({
            message: 'Car updated successfully',
            success: true,
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Car update failed',
            success: false,
            error: error instanceof Error
                ? error.message
                : 'Car update failed because either fake id or wrong info',
            stack: error instanceof Error ? error.stack : 'Error updating car',
        });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield (0, car_service_1.deleteCarInDB)(carId);
        res.status(200).json({
            message: 'Car deleted successfully',
            success: true,
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            message: 'Error deleting car, Car not found',
            status: false,
            success: false,
            error: error instanceof Error ? error.message : 'Error while deleting car',
            stack: error instanceof Error
                ? error.stack
                : 'Error stack: error deleting car',
        });
    }
});
exports.deleteCar = deleteCar;
