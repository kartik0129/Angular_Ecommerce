import { Order } from "../Orders/order.model";
import { Request, Response  } from "express";

export const perfromAnalysis = async (req: Request, res: Response): Promise<void> => {
    try {

        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const totalRevenue = await Order.aggregate([
            //stage 1
            {
                $match: {
                    createdAt: {
                        $gte: new Date(
                          new Date(startDate).setHours(0o0, 0o0, 0o0)
                        ),
                        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                      },
                }
            },
            //stage 2
            {
                $project: {
                    bill:1
                }
            },
            //stage 3
            {
                $group: {
                    _id: null,
                    totalCgst: {
                        $sum:'$bill.cgst'
                    },
                    totalSgst: {
                        $sum:'$bill.sgst'
                    },
                    totalSubTotal: {
                        $sum:'$bill.subTotal'
                    }
                }
            }
        ])

        const ordersPerDay = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(
                            new Date(startDate).setHours(0o0, 0o0, 0o0)
                        ),
                        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                    },
                }
            },
            {
                $project: {
                    createdAt: 1
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    total: { $sum: 1 }
                }
            }
        ]);
        const labels:any[] = []
        const data: any[] = []
        ordersPerDay.forEach((order: any) => {
            labels.push(order._id);
            data.push(order.total);
        })

        const mostBoughtItems = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(
                          new Date(startDate).setHours(0o0, 0o0, 0o0)
                        ),
                        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
                      },
                }
            },
            {
                $project: {
                    cartItems:1
                }
            },
            {
                $unwind:'$cartItems'
            },
            {
                $group: {
                    _id: '$cartItems.productName',
                    total: {
                        $sum:1
                    }
                }
            },
            {
                $sort: {
                    total:-1
                }
            }
        ])

        res.status(200).json({
            success: true,
            totalRevenue,
            labels,
            data,
            mostBoughtItems
        })
        
    } catch (error:any) {
        res.status(500).send({
            success: false,
            error
        })
    }
}