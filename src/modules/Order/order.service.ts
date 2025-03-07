/* import { Types } from 'mongoose';
import { OrderData } from './order.interface';
import { getSingleCarFromDB } from '../Car/car.service';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: OrderData) => {
  const { email, car, quantity, totalPrice } = orderData;
  if (!Types.ObjectId.isValid(car)) {
    throw new Error('Invalid car ID');
  }

  const checkIfCarAvailable = await getSingleCarFromDB(car);
  if (!checkIfCarAvailable) {
    throw new Error('Car not found');
  }

  //   console.log(checkIfCarAvailable);
  if (checkIfCarAvailable.quantity < quantity) {
    throw new Error(
      'Insufficiant stock, please reduce order quantity or request for stock',
    );
  }

  checkIfCarAvailable.quantity -= quantity;
  checkIfCarAvailable.inStock = checkIfCarAvailable.quantity > 0;
  await checkIfCarAvailable.save();

  return await Order.create({ email, car, quantity, totalPrice });
};

const calculateRevenue = async () => {
    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
            }
        }
    ])

    // console.log(result);

    return result[0]?.totalRevenue || 0;
    
    
}

export { createOrderIntoDB, calculateRevenue };
 */

import mongoose from "mongoose";
import { Car } from "../Car/car.model";
import { IOrderInput } from "./order.interface";
import { Order } from "./order.model";




export const createOrderIntoDB = async (orderData: IOrderInput) => {
  const carId = new mongoose.Types.ObjectId(orderData.car);

  const car = await Car.findById(carId);
  if (!car) {
    throw new Error('Car not found');
  }
  if (car.quantity < orderData.quantity) {
    throw new Error('Not enough stock available');
  }
  car.quantity = car.quantity - orderData.quantity;
  if (car.quantity <= 0) {
    car.inStock = false;
  }
  await car.save();
  
  const order = new Order({ 
    email: orderData.email, 
    car: carId, 
    quantity: orderData.quantity, 
    totalPrice: orderData.totalPrice 
  });
  return await order.save();
};

export const calculateRevenue = async () => {
  const orders = await Order.find({});
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  return totalRevenue;
};
