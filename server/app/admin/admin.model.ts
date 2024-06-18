import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productSku: {
        type:String
    },
    productName: {
        type:String
    },
    productPrice: {
        type:Number
    },
    productShortName: {
        type:String
    },
    deliveryTimeSpan: {
        type:String
    },
    categoryName: {
        type:String
    },
    productImageUrl: {
        type:String
    },
    productDescription: {
        type:String
    }

},{timestamps:true})

export const Product = mongoose.model('Product',productSchema)
