
// export type OrderType = {
//   email: string;
//   car: Types.ObjectId;
//   quantity: number;
//   totalPrice: number;
//   status: string;
// };

import { Document, Types } from "mongoose";


export interface IOrder extends Document {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status?: string;
}

export interface IOrderInput {
  email: string;
  car: string; 
  quantity: number;
  totalPrice: number;
}

