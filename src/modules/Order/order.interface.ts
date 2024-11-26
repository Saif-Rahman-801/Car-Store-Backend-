import { Types } from 'mongoose';

export type OrderType = {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};
