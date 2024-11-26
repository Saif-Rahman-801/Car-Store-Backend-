import { CarType } from './car.interface';
import { Car } from './car.model';

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

export { createACartoDB, getAllCarsFromDB };
