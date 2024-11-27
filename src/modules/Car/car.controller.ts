import { Request, Response } from 'express';
import {
  carSchemaValidation,
  carUpdateSchemaValidation,
} from './car.validation';
import {
  createACartoDB,
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
  } catch (error: any) {
    res.status(400).json({
      message: 'Car creation failed',
      success: false,
      error: error,
      stack: error.stack,
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
      data: cars,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Car loading failed',
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await getSingleCarFromDB(carId);
    if (!result) {
      res.status(404).json({
        message: 'Car not found;',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Car retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error retrieving car',
      status: false,
      error: error,
      stack: error.stack,
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
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Car update failed',
      success: false,
      error: error ? error.message : "Car update failed because either fake id or wrong info",
      stack: error.stack,
    });
  }
};

export { createCar, getAllCars, getCarById, updateCar };
