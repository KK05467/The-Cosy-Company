import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stops: [
      {
        type: String,
        trim: true,
      },
    ],

    departureDate: {
      type: Date,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
    },

    vehicleName: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    fixedFare: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "full", "completed", "cancelled"],
      default: "active",
    },
    vehicleType: {
    type: String,
    enum: ["bike", "car"],
    default: "car"
},

distance: {
    type: Number,
    default: 0
},

startLocation: {
    lat: Number,
    lng: Number,
    address: String
},

destinationLocation: {
    lat: Number,
    lng: Number,
    address: String
},
currentLocation: {
  lat: Number,
  lng: Number
},

routeCoordinates: [
{
    lat: Number,
    lng: Number
}
],
rideStatus: {
    type: String,
    enum: [
        "scheduled",
        "started",
        "arrived",
        "completed",
        "cancelled"
    ],
    default: "scheduled"
},

estimatedDuration: Number,

currentLocation: {
    lat: Number,
    lng: Number
},
  },
  {
    timestamps: true,
  }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;