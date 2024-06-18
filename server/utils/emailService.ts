import nodemailer from 'nodemailer';

const sendMail = function (order:any, bill:any) {
    const transPorter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "cooldude.kartik.123@gmail.com",
            pass: "bfwk tsac bfsx acon",
        },
    });

    const mailOptions = {
        from: "cooldude.kartik.123@gmail.com",
        to: 'kartik292001@gmail.com',
        subject: 'Order Placed',
        text:`Hi!, Your order with ${order.length} items has been placed for amount ${bill.subTotal+bill.cgst+bill.sgst}, Kindly wait for your order`
    }

    transPorter.sendMail(mailOptions).then((err:any) => {
        if (err) {
            console.log(err);
        }
        else {
            'Mail send successfully'
        }
    })
}

export default sendMail;