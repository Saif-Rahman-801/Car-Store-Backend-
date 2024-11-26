import { CarType } from './car.interface';
import { Car } from './car.model';

const createACartoDB = async (carData: CarType) => {
  const result = await Car.create(carData);
  return result;
};

export {
    createACartoDB
}
