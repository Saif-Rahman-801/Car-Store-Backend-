import { Request, Response } from 'express';
import { orderSchemaValidation } from './order.validation';
import { createOrderIntoDB } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrderData = orderSchemaValidation.parse(req.body);
    const orderData = await createOrderIntoDB(newOrderData)

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      success: true,
      data: orderData,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Order creation failed',
      status: false,
      success: false,
      error: error ? error.message : error.stack,
      stack: error.stack,
    });
  }
};

export {createOrder}
