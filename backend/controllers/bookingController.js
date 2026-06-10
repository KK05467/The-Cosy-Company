import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import { calculateFare }
from "../utils/fareCalculator.js";
import Notification from "../models/Notification.js";
import { geocodeLocation }
from "../utils/geocode.js";

import { calculateSegmentDistance }
from "../utils/calculateSegmentDistance.js";
import { findNearestIndex }
from "../utils/findNearestIndex.js";

export const createBooking = async (req, res) => {
  try {
    const {
      rideId,
      pickupPoint,
      dropPoint,
      seatsBooked,
    } = req.body;

    // basic validation FIRST (faster fail)
    if (!rideId) {
      return res.status(400).json({
        success: false,
        message: "rideId is required",
      });
    }

    if (!pickupPoint || !dropPoint) {
      return res.status(400).json({
        success: false,
        message: "Pickup and Drop required",
      });
    }

    if (!seatsBooked || seatsBooked <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid seat count",
      });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (ride.availableSeats < seatsBooked) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }
   const riderStart =
  await geocodeLocation(
    pickupPoint
  );

const riderEnd =
  await geocodeLocation(
    dropPoint
  );
  const startIndex =
  findNearestIndex(
    riderStart,
    ride.routeCoordinates
  );

const endIndex =
  findNearestIndex(
    riderEnd,
    ride.routeCoordinates
  );

if (startIndex >= endIndex) {

  return res.status(400).json({
    success: false,
    message:
      "Reverse direction journey is not allowed"
  });

}

const segmentDistance =
  calculateSegmentDistance(
    riderStart,
    riderEnd,
    ride.routeCoordinates
  );

if (segmentDistance <= 0) {

  return res.status(400).json({
    success: false,
    message:
      "Pickup and drop points are not on the driver's route",
  });

}

const fareBreakdown =
  calculateFare(
    segmentDistance,
    ride.vehicleType,
    false,
    new Date().getHours()
  );

const amount =
  fareBreakdown.totalFare *
  seatsBooked;

    const booking = await Booking.create({
  rideId: ride._id,
  passengerId: req.user._id,
  pickupPoint,
  dropPoint,
  seatsBooked,
  amount,
  paymentStatus: "pending",
  bookingStatus: "pending",
});
await Notification.create({
  riderId: req.user._id,
  driverId: ride.driverId,
  rideId: ride._id,
  bookingId: booking._id,
})
    ride.availableSeats -= seatsBooked;

    if (ride.availableSeats <= 0) {
      ride.availableSeats = 0;
      ride.status = "full";
    }

    await ride.save();

    return res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {
    console.log("BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      passengerId: req.user._id,
    })
      .populate("rideId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("rideId")
      .populate("passengerId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};