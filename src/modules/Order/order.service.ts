import { Types } from 'mongoose';
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

export { createOrderIntoDB };
