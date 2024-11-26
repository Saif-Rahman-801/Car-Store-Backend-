import express from 'express';
import { createCar, getAllCars, getCarById } from './car.controller';
const router = express.Router();

router.post('/', createCar);
router.get('/', getAllCars);
router.get('/:carId', getCarById);

export const CarRoutes = router;
