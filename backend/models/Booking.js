import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },

    passengerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickupPoint: {
      type: String,
      required: true,
    },

    dropPoint: {
      type: String,
      required: true,
    },

    seatsBooked: {
      type: Number,
      required: true,
      min: 1,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;