import Payment from "../models/Payment.js";
import Wallet from "../models/Wallet.js";
import Razorpay from "razorpay";
import crypto from "crypto";
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