import { Types } from 'mongoose';

export type OrderType = {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};

export type OrderData = {
  email: string;
  car: string;
  quantity: number;
  totalPrice: number;
};
