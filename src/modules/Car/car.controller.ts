import { Request, Response } from 'express';
import { carSchemaValidation } from './car.validation';
import { createACartoDB } from './car.service';

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

export { createCar };
