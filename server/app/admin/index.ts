import express from 'express';
import { createProduct,deleteProduct,editProduct,getProducts } from './admin.controller';

const routes = express.Router();

routes.post('/createProduct', createProduct);
routes.get('/getProducts', getProducts);
routes.delete('/deleteProduct/:id', deleteProduct);
routes.put('/editProduct/:id',editProduct)

export default routes;
