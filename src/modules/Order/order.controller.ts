/* import { Request, Response } from 'express';
import { orderSchemaValidation } from './order.validation';
import { calculateRevenue, createOrderIntoDB } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrderData = orderSchemaValidation.parse(req.body);

    const orderData = await createOrderIntoDB(newOrderData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      success: true,
      data: orderData,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Order creation failed',
      status: false,
      success: false,
      error: error instanceof Error ? error.message : "Order creation failed",
      stack: error instanceof Error? error.stack: "Order creation failed",
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      success: true,
      data: { totalRevenue },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      success: false,
      error: error,
      stack: error instanceof Error ? error.stack : "Failed to calculate revenue",
    });
  }
};

export { createOrder, getRevenue };
 */

import { Request, Response } from 'express';
import { orderSchemaValidation } from './order.validation';
import { calculateRevenue, createOrderIntoDB } from './order.service';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrderData = orderSchemaValidation.parse(req.body);
    const orderData = await createOrderIntoDB(newOrderData);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      success: true,
      data: orderData,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Order creation failed',
      status: false,
      success: false,
      error: error instanceof Error ? error.message : 'Order creation failed',
      stack: error instanceof Error ? error.stack : 'Order creation failed',
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      success: true,
      data: { totalRevenue },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      success: false,
      error: error,
      stack:
        error instanceof Error ? error.stack : 'Failed to calculate revenue',
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found', success: false });
    }
    res
      .status(200)
      .json({
        message: 'Order retrieved successfully',
        success: true,
        data: order,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Error retrieving order',
        success: false,
        error: error instanceof Error ? error.message : error,
      });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updateData = req.body;
    const order = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    if (!order) {
      res.status(404).json({ message: 'Order not found', success: false });
    }
    res
      .status(200)
      .json({
        message: 'Order updated successfully',
        success: true,
        data: order,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        message: 'Order update failed',
        success: false,
        error: error instanceof Error ? error.message : error,
      });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found', success: false });
    }
    res
      .status(200)
      .json({
        message: 'Order deleted successfully',
        success: true,
        data: order,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Order deletion failed',
        success: false,
        error: error instanceof Error ? error.message : error,
      });
  }
};

const listOrders = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user;
    let orders;
    if (user && user.role === 'admin') {
      orders = await Order.find({});
    } else {
      orders = await Order.find({ email: user.email });
    }
    res
      .status(200)
      .json({
        message: 'Orders retrieved successfully',
        success: true,
        data: orders,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Failed to retrieve orders',
        success: false,
        error: error instanceof Error ? error.message : error,
      });
  }
};

export {
  createOrder,
  getRevenue,
  getOrderById,
  updateOrder,
  deleteOrder,
  listOrders,
};
