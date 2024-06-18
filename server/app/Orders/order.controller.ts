import { Request,Response } from 'express';
import {Order} from './order.model';
import sendMail from '../../utils/emailService';


export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        if (newOrder) {
            sendMail(req.body.cartItems,req.body.bill);
            res.status(201).json({
                success: true,
                message: 'Order Created successfully',
                newOrder
            })
        }
        else {
            res.status(400).json({
                success: false,
                message:'Order creation failed'
            })
        }

    } catch (error:any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();
        if (orders) {
            res.status(200).json({
                success: true,
                message: 'Ordered fetched successfully',
                orders
            })
        }
        else {
            res.status(400).json({
                success: false,
                message:'Cannot fetch orders'
            })
        }

    } catch (error:any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}