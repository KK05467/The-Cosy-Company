import Payment from "../models/Payment.js";
import Wallet from "../models/Wallet.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import PlatformWallet from "../models/PlatformWallet.js";
import Transaction from "../models/Transaction.js";
import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import User from "../models/User.js";
//import { configDotenv } from "dotenv";
import dotenv from "dotenv";
dotenv.config();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
export const createOrder = async (
  req,
  res
) => {
  try {

    const { amount } = req.body;

    const order =
      await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
      });

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const verifyPayment = async (
  req,
  res
) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generated =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(
        razorpay_order_id +
        "|" +
        razorpay_payment_id
      )
      .digest("hex");

  if (
    generated ===
    razorpay_signature
  ) {
    return res.json({
      success: true,
    });
  }

  res.status(400).json({
    success: false,
  });
};
export const walletPayment = async (req, res) => {

    try {

        const { bookingId } = req.body;

        const booking =
            await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        const ride =
            await Ride.findById(booking.rideId);

        const driver =
            await User.findById(ride.driverId);

        const riderWallet =
            await Wallet.findOne({
                user: booking.riderId
            });

        const driverWallet =
            await Wallet.findOne({
                user: ride.driverId
            });

        let platformWallet =
            await PlatformWallet.findOne();

        if (!platformWallet) {
            platformWallet =
                await PlatformWallet.create({});
        }

        const baseFare = booking.amount;

        const platformFee = 10;

        const lateNightCharge = 0;

        const rainCharge = 0;

        const driverAmount =
            baseFare +
            0.5 *
            (
                lateNightCharge +
                rainCharge
            );

        const companyAmount =
            platformFee +
            0.5 *
            (
                lateNightCharge +
                rainCharge
            );

        const totalAmount =
            driverAmount +
            companyAmount;

        if (riderWallet.balance < totalAmount) {

            return res.status(400).json({
                success: false,
                message: "Insufficient balance"
            });

        }

        riderWallet.balance -= totalAmount;

        driverWallet.balance += driverAmount;

        platformWallet.balance += companyAmount;

        driver.earnings += driverAmount;

        booking.paymentStatus = "paid";

        await riderWallet.save();

        await driverWallet.save();

        await platformWallet.save();

        await driver.save();

        await booking.save();

        await Transaction.create({

            sender: booking.riderId,

            receiver: ride.driverId,

            rideId: ride._id,

            baseFare,

            platformFee,

            lateNightCharge,

            rainCharge,

            driverAmount,

            companyAmount,

            totalAmount

        });

        res.json({

            success: true,

            message: "Payment successful"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};