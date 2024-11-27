import express from 'express';
import { createCar, getAllCars, getCarById, updateCar } from './car.controller';
const router = express.Router();

router.post('/', createCar);
router.get('/', getAllCars);
router.get('/:carId', getCarById);
router.put('/:carId', updateCar);

export const CarRoutes = router;
