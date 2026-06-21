/**
 * bookingController.js
 *
 * KEY FIX from original:
 * - The original passed [lng, lat] arrays to findNearestIndex and
 *   calculateSegmentDistance, but those utils expect {lat, lng} objects.
 *   Fixed to pass { lat, lng } objects consistently throughout.
 *
 * Flow for createBooking:
 * 1. Validate input.
 * 2. Find ride, check seat availability.
 * 3. Geocode passenger's pickup and drop text into { lat, lng }.
 * 4. Verify both points are on the driver's stored route (300m threshold).
 * 5. Verify direction is correct (pickup index < drop index on route).
 * 6. Calculate segment distance along the route polyline.
 * 7. Calculate fare for that segment.
 * 8. Create Booking (pending) + Notification for driver.
 * 9. Decrement ride's availableSeats, mark "full" if 0.
 */

import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import Notification from "../models/Notification.js";
import { geocodeLocation } from "../utils/geocode.js";
import { isPointOnRoute } from "../utils/isPointOnRoute.js";
import { findNearestIndex } from "../utils/findNearestIndex.js";
import { calculateSegmentDistance } from "../utils/calculateSegmentDistance.js";
import { calculateFare } from "../utils/fareCalculator.js";

// ─────────────────────────────────────────────
// POST /api/bookings
// Passenger books seats on a ride.
// Body: { rideId, pickupPoint (string), dropPoint (string), seatsBooked }
// ─────────────────────────────────────────────
export const createBooking = async (req, res) => {
  try {
    const { rideId, pickupPoint, dropPoint, seatsBooked } = req.body;

    // ── Basic validation ──────────────────────
    if (!rideId) {
      return res.status(400).json({ success: false, message: "rideId is required" });
    }
    if (!pickupPoint || !dropPoint) {
      return res.status(400).json({ success: false, message: "Pickup and drop are required" });
    }
    if (!seatsBooked || seatsBooked <= 0) {
      return res.status(400).json({ success: false, message: "Invalid seat count" });
    }

    // ── Find ride ─────────────────────────────
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }
    if (ride.availableSeats < seatsBooked) {
      return res.status(400).json({ success: false, message: "Not enough seats available" });
    }

    // ── Geocode passenger's pickup and drop ───
    const [riderStart, riderEnd] = await Promise.all([
      geocodeLocation(pickupPoint),
      geocodeLocation(dropPoint),
    ]);

    if (!riderStart || !riderEnd) {
      return res.status(400).json({
        success: false,
        message: "Could not geocode your pickup or drop location",
      });
    }

    // ── Check both points are on the route ────
    const pickupOnRoute = isPointOnRoute(riderStart, ride.routeCoordinates);
    const dropOnRoute = isPointOnRoute(riderEnd, ride.routeCoordinates);

    if (!pickupOnRoute || !dropOnRoute) {
      return res.status(400).json({
        success: false,
        message: "Pickup or drop point is not on the driver's route",
      });
    }

    // ── Check direction (no reverse travel) ───
    // Pass { lat, lng } objects — NOT arrays
    const startIndex = findNearestIndex(riderStart, ride.routeCoordinates);
    const endIndex = findNearestIndex(riderEnd, ride.routeCoordinates);

    if (startIndex >= endIndex) {
      return res.status(400).json({
        success: false,
        message: "Reverse direction journey is not allowed",
      });
    }

    // ── Calculate segment distance ────────────
    // Pass { lat, lng } objects — NOT arrays
    const segmentDistance = calculateSegmentDistance(
      riderStart,
      riderEnd,
      ride.routeCoordinates
    );

    if (segmentDistance <= 0) {
      return res.status(400).json({
        success: false,
        message: "Could not calculate distance for your segment",
      });
    }

    // ── Calculate fare ────────────────────────
    const fareBreakdown = calculateFare(
      segmentDistance,
      ride.vehicleType,
      false,
      new Date().getHours()
    );

    const amount = parseFloat(
      (fareBreakdown.totalFare * seatsBooked).toFixed(2)
    );

    // ── Create booking ────────────────────────
    const booking = await Booking.create({
      rideId: ride._id,
      driverId: ride.driverId,
      passengerId: req.user._id,
      pickupPoint,
      dropPoint,
      seatsBooked,
      amount,
      fareBreakdown,
      distanceCovered: segmentDistance,
      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    // ── Notify the driver ─────────────────────
    await Notification.create({
      riderId: req.user._id,
      driverId: ride.driverId,
      rideId: ride._id,
      bookingId: booking._id,
    });

    // ── Decrement seats ───────────────────────
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
    console.error("createBooking error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/bookings/my
// Passenger fetches all their bookings.
// ─────────────────────────────────────────────
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passengerId: req.user._id })
      .populate("rideId")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/bookings/:id
// Get a specific booking by ID.
// ─────────────────────────────────────────────
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("rideId")
      .populate("passengerId", "name phone");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.json({ success: true, booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/bookings/cancel/:id
// Passenger cancels a booking.
// ─────────────────────────────────────────────
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.passengerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      booking.bookingStatus === "cancelled" ||
      booking.bookingStatus === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message: `Booking already ${booking.bookingStatus}`,
      });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    const ride = await Ride.findById(booking.rideId);

    if (ride) {
      ride.availableSeats += booking.seatsBooked;

      if (ride.status === "full") {
        ride.status = "active";
      }

      await ride.save();
    }

    return res.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};