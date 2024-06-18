import { Product } from "./admin.model";
import { Request,Response } from "express";

export const createProduct = async (req: Request, res: Response):Promise<void>=>{
    try {
        const productName = req.body.productName;
        const categoryName = req.body.categoryName;
        const product = await Product.findOne({ productName, categoryName });
        if (product) {
            res.status(400).json({
                success: true,
                message:'Product already exists'
            })
        }
        else {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(200).json({
                success: true,
                message: 'Product created successfully',
                newProduct
            })
        }

        
    } catch (error:any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}


export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
            res.status(201).json({
                success: true,
                message: 'Products fetched successfully',
                products
            })
    } catch (error:any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete({ _id: id });
        if (deletedProduct) {
            res.status(201).json({
                success: true,
                message:'Product deleted successfully'
            })
        }
        else {
            res.status(400).json({
                success: false,
                message:'No Product found'
            })
        }
    } catch (error:any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}


export const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const editedProduct = await Product.findByIdAndUpdate({ _id: id }, req.body);
        console.log(editedProduct);
        if (editedProduct) {
            res.status(201).json({
                success: true,
                message: "Product updated successfully",
                editedProduct
            })
        }
        else {
            res.status(400).json({
                success: false,
                message:'No product with this id'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}