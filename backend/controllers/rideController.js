/**
 * rideController.js
 *
 * KEY CHANGE from original:
 * - createRide no longer requires the frontend to send routeCoordinates or distance.
 *   It only needs startLocation and destinationLocation (lat/lng + address).
 *   The backend fetches the real driving route from OSRM automatically.
 *
 * - searchRides uses proper geo matching: geocodes the passenger's from/to,
 *   then checks each active ride's stored routeCoordinates.
 */

import Ride from "../models/Ride.js";
import { calculateFare } from "../utils/fareCalculator.js";
import { geocodeLocation } from "../utils/geocode.js";
import { getRoute } from "../utils/getRoute.js";
import { isPointOnRoute } from "../utils/isPointOnRoute.js";
import { findNearestIndex } from "../utils/findNearestIndex.js";

// ─────────────────────────────────────────────
// POST /api/rides
// Driver creates a new ride.
// Frontend sends: from, to, startLocation {lat,lng,address},
//   destinationLocation {lat,lng,address}, vehicleName, vehicleNumber,
//   vehicleType, totalSeats, departureDate, departureTime
//
// Backend auto-fetches: routeCoordinates, distance, estimatedDuration, fixedFare
// ─────────────────────────────────────────────
export const createRide = async (req, res) => {
  try {
    const {
      from,
      to,
      startLocation,       // { lat, lng, address }
      destinationLocation, // { lat, lng, address }
      vehicleName,
      vehicleNumber,
      vehicleType,
      totalSeats,
      departureDate,
      departureTime,
    } = req.body;

    // Validate required location objects
    if (
      !startLocation?.lat || !startLocation?.lng ||
      !destinationLocation?.lat || !destinationLocation?.lng
    ) {
      return res.status(400).json({
        success: false,
        message: "startLocation and destinationLocation with lat/lng are required",
      });
    }

    // Fetch real driving route from OSRM
    const routeData = await getRoute(
      startLocation.lat,
      startLocation.lng,
      destinationLocation.lat,
      destinationLocation.lng
    );

    if (!routeData) {
      return res.status(500).json({
        success: false,
        message: "Could not fetch route from mapping service. Try again.",
      });
    }

    const { distance, duration, routeCoordinates } = routeData;

    // Calculate fare based on full route distance
    const fare = calculateFare(
      distance,
      vehicleType,
      false,
      new Date().getHours()
    );

    const ride = await Ride.create({
      driverId: req.user._id,
      from,
      to,
      startLocation,
      destinationLocation,
      routeCoordinates,   // stored from OSRM
      distance,           // km
      estimatedDuration: duration, // seconds
      departureDate,
      departureTime,
      vehicleName,
      vehicleNumber,
      vehicleType,
      totalSeats,
      availableSeats: totalSeats,
      fixedFare: fare.totalFare,
    });

    return res.status(201).json({
      success: true,
      ride,
    });
  } catch (error) {
    console.error("createRide error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/rides/my-rides
// Driver fetches all their own rides.
// ─────────────────────────────────────────────
export const getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/rides/search?from=...&to=...
// Passenger searches for rides.
//
// Logic:
// 1. Geocode passenger's from and to into coordinates.
// 2. For every active ride with seats available:
//    a. Check passenger's pickup is ON the ride's route (within 300m).
//    b. Check passenger's drop is ON the ride's route (within 300m).
//    c. Check direction is correct (pickup index < drop index).
// 3. Return matched rides.
// ─────────────────────────────────────────────
export const searchRides = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "from and to query params are required",
      });
    }

    // Geocode passenger's from/to text
    const [passengerStart, passengerEnd] = await Promise.all([
      geocodeLocation(from),
      geocodeLocation(to),
    ]);

    if (!passengerStart || !passengerEnd) {
      return res.status(400).json({
        success: false,
        message: "Could not geocode your from/to locations. Try more specific addresses.",
      });
    }

    // Fetch all active rides that still have seats
    const rides = await Ride.find({
      status: "active",
      availableSeats: { $gt: 0 },
    });

    const matchedRides = [];

    for (const ride of rides) {
      if (!ride.routeCoordinates || ride.routeCoordinates.length < 2) {
        continue;
      }

      // Check both points are on the route
      const pickupOnRoute = isPointOnRoute(passengerStart, ride.routeCoordinates);
      const dropOnRoute = isPointOnRoute(passengerEnd, ride.routeCoordinates);

      if (!pickupOnRoute || !dropOnRoute) continue;

      // Check direction (passenger must be traveling same way as driver)
      const startIdx = findNearestIndex(passengerStart, ride.routeCoordinates);
      const endIdx = findNearestIndex(passengerEnd, ride.routeCoordinates);

      if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) continue;

      matchedRides.push(ride);
    }

    return res.json({
      success: true,
      count: matchedRides.length,
      rides: matchedRides,
    });
  } catch (error) {
    console.error("searchRides error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/rides/:id
// Get a single ride with driver info populated.
// ─────────────────────────────────────────────
export const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate(
      "driverId",
      "name phone rating totalTrips location"
    );

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    return res.status(200).json({
      success: true,
      ride,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// PUT /api/rides/update-location
// Driver updates their live position during a ride.
// Body: { lat, lng }
// ─────────────────────────────────────────────
export const updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({
        success: false,
        message: "lat and lng are required",
      });
    }

    const ride = await Ride.findOne({
      driverId: req.user._id,
      rideStatus: "started",
    });

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "No active started ride found for this driver",
      });
    }

    ride.currentLocation = { lat, lng };
    await ride.save();

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/rides/:id/location
// Passenger polls driver's current location.
// ─────────────────────────────────────────────
export const getCurrentLocation = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).select("currentLocation rideStatus");

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    return res.json({
      success: true,
      location: ride.currentLocation,
      rideStatus: ride.rideStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/rides/start/:id
// Driver starts the ride.
// ─────────────────────────────────────────────
export const startRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    if (ride.driverId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not your ride" });
    }

    ride.rideStatus = "started";
    await ride.save();

    return res.json({ success: true, ride });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/rides/complete/:id
// Driver marks the ride as completed.
// ─────────────────────────────────────────────
export const completeRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ success: false, message: "Ride not found" });
    }

    if (ride.driverId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not your ride" });
    }

    ride.rideStatus = "completed";
    ride.status = "completed";
    await ride.save();

    return res.json({ success: true, ride });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
