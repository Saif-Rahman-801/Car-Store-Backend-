import express from 'express';
import { createCar, getAllCars } from './car.controller';
const router = express.Router();

router.post('/', createCar);
router.get('/', getAllCars);

export const CarRoutes = router;
