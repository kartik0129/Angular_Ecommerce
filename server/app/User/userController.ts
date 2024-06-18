import { Request, Response } from 'express';
import { User } from './userModel';
import sendMail from '../../utils/emailService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(200).json({
                success: true,
                message: 'User already exists',
                existingUser
            })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            req.body.password = hashedPass;
            const newUser = new User(req.body);

            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                newUser
            })
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(401).json({
                success: false,
                message: 'User does not exist'
            })
        }
        else {
            const hashedPass = existingUser.password ?? '';
            const comparePasswords = await bcrypt.compare(password, hashedPass);
            if (comparePasswords) {
                const token = jwt.sign(email, 'kartik')
                res.status(200).json({
                    success: true,
                    message: 'User successfully logged in',
                    token
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Password'
                })
            }

        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}
