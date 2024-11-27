import { model, Schema } from 'mongoose';
import { OrderType } from './order.interface';

const OrderSchema: Schema = new Schema<OrderType>({
  email: { type: String, required: true },
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
},{timestamps: true});

export const Order = model<OrderType>('Order', OrderSchema);
