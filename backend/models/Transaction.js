import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
{
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride"
    },

    baseFare: Number,

    platformFee: Number,

    lateNightCharge: Number,

    rainCharge: Number,

    driverAmount: Number,

    companyAmount: Number,

    totalAmount: Number,

    type: {
        type: String,
        default: "ride_payment"
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "Transaction",
    transactionSchema
);