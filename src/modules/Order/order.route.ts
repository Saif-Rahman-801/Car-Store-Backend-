import express from 'express';
import { createOrder, deleteOrder, getOrderById, getRevenue, listOrders, updateOrder } from './order.controller';
import { protect } from '../Auth/auth.middleware';
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/revenue', protect, getRevenue);
router.get('/', protect, listOrders);
router.get('/:orderId', protect, getOrderById);
router.put('/:orderId', protect, updateOrder);
router.delete('/:orderId', protect, deleteOrder);

export const OrderRoutes = router;
