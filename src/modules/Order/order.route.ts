import express from 'express';
import { createOrder, getRevenue } from './order.controller';
const router = express.Router();

router.post('/', createOrder);
router.post('/revenue', getRevenue);

export const OrderRoutes = router;
