import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema: Schema = new Schema<IOrder>({
  email: { type: String, required: true },
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

export const Order = model<IOrder>('Order', OrderSchema);
