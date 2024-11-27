import { Types } from 'mongoose';
import { CarType } from './car.interface';
import { Car } from './car.model';
import { Response } from 'express';

const createACartoDB = async (carData: CarType) => {
  return await Car.create(carData);
};

const getAllCarsFromDB = async (searchTerm?: string) => {
  const filter: any = {};

  if (searchTerm) {
    filter.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  //   console.log(filter);
  return await Car.find(filter);
};

const getSingleCarFromDB = async (carId: string) => {
  if (!Types.ObjectId.isValid(carId)) {
    throw new Error('Invalid car ID');
  }
  return await Car.findById(carId);
};

const updateCarInDB = async (
  carId: string,
  updateData: Partial<Record<string, any>>,
) => {
  if (!Types.ObjectId.isValid(carId)) {
    throw new Error('Invalid car ID');
  }

  const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
    new: true,
  });

  if (!updatedCar) {
    throw new Error('Car not found');
  }

  return updatedCar;
};

export { createACartoDB, getAllCarsFromDB, getSingleCarFromDB, updateCarInDB };
