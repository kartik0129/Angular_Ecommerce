import express from 'express'
import { createOrder, getOrders } from './order.controller';

const routes = express.Router();

routes.post('/createOrder', createOrder);
routes.get('/getOrders',getOrders)

export default routes;