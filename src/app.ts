import express from 'express';
import cors from 'cors';
import { CarRoutes } from './modules/Car/car.route';
import { OrderRoutes } from './modules/Order/order.route';

const app = express();

// perser
app.use(express.json());
app.use(cors());

// App routes
app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Car Store API!');
});

export default app;
