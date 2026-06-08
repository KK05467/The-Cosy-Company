import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";

export const createBooking = async (req, res) => {
  try {
    const {
      rideId,
      pickupPoint,
      dropPoint,
      seatsBooked,
    } = req.body;

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

    const amount =
      ride.fixedFare * seatsBooked;

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

    ride.availableSeats -= seatsBooked;

    if (ride.availableSeats === 0) {
      ride.status = "full";
    }

    await ride.save();

    res.status(201).json({
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