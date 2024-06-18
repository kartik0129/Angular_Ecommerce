import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import adminRoutes from './app/admin/index';
import orderRoutes from './app/Orders/index';
import analysisRoutes from './app/Analysis/index';
import userRoutes from './app/User/index'



const app:Express = express();
const PORT:number = 8080;

app.use(cors())
app.use(express.json());


//routes
app.use('/app/admin', adminRoutes);
app.use('/app/order', orderRoutes);
app.use('/app/analysis', analysisRoutes);
app.use('/app/user', userRoutes);

mongoose.connect('mongodb+srv://kartik-angular:9Cre5tIhcJM5fcpy@cluster0.lfkr39t.mongodb.net/',{family:4}).then(() => {
    console.log('Mongo db connection successfull')
}).catch((err) => {
    console.log(err);
})
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
  }); 
app.listen(PORT, () => {
    console.log(`Server connected at ${PORT}`)
})