import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cartItems: {
    type:Array
    },
    bill: {
        subTotal: {
            type:Number,
        },
        cgst: {
            type:Number
        },
        sgst: {
            type:Number
        }
    }
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema);