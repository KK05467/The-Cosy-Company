/**
 * RideRequest.js
 *
 * UPDATED from original:
 * - Added pickupCoords and dropCoords to store geocoded lat/lng
 *   so the driver can see exactly where the passenger wants pickup/drop on a map.
 * - Added pickupPoint and dropPoint as plain text (address strings).
 * - Removed old field names (pickupLocation / destinationLocation) that
 *   conflicted with the Ride model naming.
 */

import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Human-readable address strings (what the passenger typed / pin-dropped)
    pickupPoint: {
      type: String,
      required: true,
    },

    dropPoint: {
      type: String,
      required: true,
    },

    // Geocoded coordinates — stored so drivers can see on map
    pickupCoords: {
      lat: Number,
      lng: Number,
    },

    dropCoords: {
      lat: Number,
      lng: Number,
    },

    seatsRequired: {
      type: Number,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RideRequest", rideRequestSchema);