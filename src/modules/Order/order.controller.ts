import { Request, Response } from 'express';
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
