/* import { Types } from 'mongoose';
import { CarType } from './car.interface';
import { Car } from './car.model';

const createACartoDB = async (carData: CarType) => {
  return await Car.create(carData);
};

const getAllCarsFromDB = async (searchTerm?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  if (searchTerm) {
    filter.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  //   console.log(filter);
  const cars = await Car.find(filter);
  if (cars.length === 0) {
    throw new Error('Car not found');
  }
  return cars
};

const getSingleCarFromDB = async (carId: string) => {
  if (!Types.ObjectId.isValid(carId)) {
    throw new Error('Invalid car ID; Car not found');
  }
  const car = await Car.findById(carId);
  if (!car) {
    throw new Error("Car not found")
  }
  return car
};

const updateCarInDB = async (
  carId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: Partial<Record<string, any>>,
) => {
  if (!Types.ObjectId.isValid(carId)) {
    throw new Error('Invalid car ID; car not found');
  }

  const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
    new: true,
  });

  if (!updatedCar) {
    throw new Error('Car not found');
  }

  return updatedCar;
};

const deleteCarInDB = async (carID: string) => {
  if (!Types.ObjectId.isValid(carID)) {
    throw new Error('Invalid Car ID; Car not found');
  }

  const car = await Car.findByIdAndDelete(carID);
  if (!car) {
    throw new Error('Car not found');
  }
  return car
};

export {
  createACartoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarInDB,
  deleteCarInDB,
};
 */

import { CarType } from "./car.interface";
import { Car } from "./car.model";





export const createACartoDB = async (carData: CarType) => {
  const car = new Car(carData);
  return await car.save();
};

export const getAllCarsFromDB = async (searchTerm: string, page: number = 1, limit: number = 10) => {
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { brand: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }
  const skip = (page - 1) * limit;
  return await Car.find(query).skip(skip).limit(limit);
};

export const getSingleCarFromDB = async (carId: string) => {
  return await Car.findById(carId);
};

export const updateCarInDB = async (carId: string, updateData: Partial<CarType>) => {
  return await Car.findByIdAndUpdate(carId, updateData, { new: true });
};

export const deleteCarInDB = async (carId: string) => {
  return await Car.findByIdAndDelete(carId);
};
