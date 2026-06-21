import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
{
    riderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookingId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Booking",required: "false",
},

    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "Notification",
    notificationSchema
);