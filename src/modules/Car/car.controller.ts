/* import { Request, Response } from 'express';
import {
  carSchemaValidation,
  carUpdateSchemaValidation,
} from './car.validation';
import {
  createACartoDB,
  deleteCarInDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarInDB,
} from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = carSchemaValidation.parse(req.body);
    const createdCarData = await createACartoDB(carData);
    res.status(200).json({
      message: 'Car created successfully',
      success: true,
      data: createdCarData,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Car creation failed',
      success: false,
      error: error,
      stack: error instanceof Error ? error.stack : 'car creation failed',
    });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    // console.log(searchTerm);

    const cars = await getAllCarsFromDB(searchTerm as string);
    // console.log(cars);

    res.status(200).json({
      message: 'Cars retrieved successfully',
      success: true,
      status: true,
      data: cars,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Car loading failed; not found',
      success: false,
      error: error instanceof Error ? error.message : 'Car not found',
      stack: error instanceof Error ? error.stack : 'Car not found',
    });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await getSingleCarFromDB(carId);

    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error retrieving car',
      status: false,
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Car not found, error finding car',
      stack: error instanceof Error ? error.stack : 'Car not found',
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;

    const updateCarData = carUpdateSchemaValidation.parse(req.body);

    const result = await updateCarInDB(carId, updateCarData);

    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Car update failed',
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Car update failed because either fake id or wrong info',
      stack: error instanceof Error ? error.stack : 'Error updating car',
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;

    const result = await deleteCarInDB(carId);
    res.status(200).json({
      message: 'Car deleted successfully',
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error deleting car, Car not found',
      status: false,
      success: false,
      error:
        error instanceof Error ? error.message : 'Error while deleting car',
      stack:
        error instanceof Error
          ? error.stack
          : 'Error stack: error deleting car',
    });
  }
};

export { createCar, getAllCars, getCarById, updateCar, deleteCar };
 */

import { Request, Response } from 'express';
import { carSchemaValidation, carUpdateSchemaValidation } from './car.validation';
import { createACartoDB, deleteCarInDB, getAllCarsFromDB, getSingleCarFromDB, updateCarInDB } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = carSchemaValidation.parse(req.body);
    const createdCarData = await createACartoDB(carData);
    res.status(200).json({
      message: 'Car created successfully',
      success: true,
      data: createdCarData,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Car creation failed',
      success: false,
      error: error,
      stack: error instanceof Error ? error.stack : 'car creation failed',
    });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const { searchTerm, page, limit } = req.query;
    const pageNum = page ? parseInt(page as string) : 1;
    const limitNum = limit ? parseInt(limit as string) : 10;
    const cars = await getAllCarsFromDB(searchTerm as string, pageNum, limitNum);
    res.status(200).json({
      message: 'Cars retrieved successfully',
      success: true,
      status: true,
      data: cars,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Car loading failed; not found',
      success: false,
      error: error instanceof Error ? error.message : 'Car not found',
      stack: error instanceof Error ? error.stack : 'Car not found',
    });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await getSingleCarFromDB(carId);
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error retrieving car',
      status: false,
      success: false,
      error: error instanceof Error ? error.message : 'Car not found, error finding car',
      stack: error instanceof Error ? error.stack : 'Car not found',
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const updateCarData = carUpdateSchemaValidation.parse(req.body);
    const result = await updateCarInDB(carId, updateCarData);
    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Car update failed',
      success: false,
      error: error instanceof Error ? error.message : 'Car update failed because either fake id or wrong info',
      stack: error instanceof Error ? error.stack : 'Error updating car',
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await deleteCarInDB(carId);
    res.status(200).json({
      message: 'Car deleted successfully',
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error deleting car, Car not found',
      status: false,
      success: false,
      error: error instanceof Error ? error.message : 'Error while deleting car',
      stack: error instanceof Error ? error.stack : 'Error stack: error deleting car',
    });
  }
};

export { createCar, getAllCars, getCarById, updateCar, deleteCar };