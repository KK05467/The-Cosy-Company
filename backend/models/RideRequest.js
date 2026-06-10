import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema(
{
    riderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pickupLocation: {
        lat: Number,
        lng: Number,
        address: String
    },

    destinationLocation: {
        lat: Number,
        lng: Number,
        address: String
    },

    routeCoordinates: [
        {
            lat: Number,
            lng: Number
        }
    ],

    seatsRequired: {
        type: Number,
        default: 1
    },

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "completed",
            "cancelled"
        ],
        default: "pending"
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "RideRequest",
    rideRequestSchema
);