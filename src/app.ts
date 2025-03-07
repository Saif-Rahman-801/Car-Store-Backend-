import express from 'express';
import cors from 'cors';
import { CarRoutes } from './modules/Car/car.route';
import { OrderRoutes } from './modules/Order/order.route';
import { authRoutes } from './modules/Auth/auth.route';

const app = express();

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// App routes
app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Car Store API!');
});


export default app;
