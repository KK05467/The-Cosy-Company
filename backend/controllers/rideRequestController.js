/**
 * rideRequestController.js
 *
 * COMPLETE REWRITE from original.
 *
 * Problems with original:
 * 1. `Ride` was used but never imported.
 * 2. `isSameRoute` did a simple string .includes() match on city names —
 *    completely unreliable for real addresses or coordinate-based routing.
 * 3. No geocoding of the passenger's pickup/drop before matching.
 * 4. No direction check (reverse journeys could match).
 *
 * New logic:
 * 1. Passenger posts a ride request with pickupPoint and dropPoint (text addresses).
 * 2. Backend geocodes both into { lat, lng }.
 * 3. Backend fetches all active rides with enough seats.
 * 4. For each ride, checks if both geocoded points are on the ride's stored
 *    routeCoordinates (within 300m threshold).
 * 5. Also checks direction (pickup index < drop index on the route).
 * 6. For every matched ride, creates a Notification for that driver.
 * 7. Returns the created request + list of matched ride IDs.
 */

import RideRequest from "../models/RideRequest.js";
import Ride from "../models/Ride.js";
import Notification from "../models/Notification.js";
import { geocodeLocation } from "../utils/geocode.js";
import { isPointOnRoute } from "../utils/isPointOnRoute.js";
import { findNearestIndex } from "../utils/findNearestIndex.js";

// ─────────────────────────────────────────────
// POST /api/ride-requests
// Passenger posts a request (no specific ride chosen).
// Drivers whose route covers the segment get notified.
//
// Body: { pickupPoint (string), dropPoint (string), seatsRequired }
// ─────────────────────────────────────────────
export const createRideRequest = async (req, res) => {
  try {
    const { pickupPoint, dropPoint, seatsRequired = 1 } = req.body;

    if (!pickupPoint || !dropPoint) {
      return res.status(400).json({
        success: false,
        message: "pickupPoint and dropPoint are required",
      });
    }

    if (seatsRequired <= 0) {
      return res.status(400).json({
        success: false,
        message: "seatsRequired must be at least 1",
      });
    }

    // ── Geocode passenger's locations ─────────
    const [passengerStart, passengerEnd] = await Promise.all([
      geocodeLocation(pickupPoint),
      geocodeLocation(dropPoint),
    ]);

    if (!passengerStart || !passengerEnd) {
      return res.status(400).json({
        success: false,
        message: "Could not geocode your pickup or drop location. Try a more specific address.",
      });
    }

    // ── Save the ride request ─────────────────
    const request = await RideRequest.create({
      riderId: req.user._id,
      pickupPoint,
      dropPoint,
      pickupCoords: passengerStart,   // { lat, lng } — stored for driver reference
      dropCoords: passengerEnd,       // { lat, lng }
      seatsRequired,
    });

    // ── Find matching rides ───────────────────
    const activeRides = await Ride.find({
      status: "active",
      availableSeats: { $gte: seatsRequired },
    });

    const matchedRides = [];

    for (const ride of activeRides) {
      if (!ride.routeCoordinates || ride.routeCoordinates.length < 2) continue;

      // Both points must be on the route
      const pickupOnRoute = isPointOnRoute(passengerStart, ride.routeCoordinates);
      const dropOnRoute = isPointOnRoute(passengerEnd, ride.routeCoordinates);

      if (!pickupOnRoute || !dropOnRoute) continue;

      // Direction check
      const startIdx = findNearestIndex(passengerStart, ride.routeCoordinates);
      const endIdx = findNearestIndex(passengerEnd, ride.routeCoordinates);

      if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) continue;

      matchedRides.push(ride);

      // Notify each matched driver
      await Notification.create({
        riderId: req.user._id,
        driverId: ride.driverId,
        rideId: ride._id,
        // bookingId is not set here — this is a request, not a booking yet.
        // The driver can choose to accept and the frontend can then
        // trigger a real booking. bookingId is optional in Notification schema.
        type: "ride_request",        // optional extra field for UI distinction
      });
    }

    return res.status(201).json({
      success: true,
      request,
      matchedCount: matchedRides.length,
      matchedRides: matchedRides.map((r) => ({
        rideId: r._id,
        driverId: r.driverId,
        from: r.from,
        to: r.to,
        departureDate: r.departureDate,
        departureTime: r.departureTime,
        availableSeats: r.availableSeats,
        fixedFare: r.fixedFare,
        vehicleType: r.vehicleType,
      })),
    });
  } catch (error) {
    console.error("createRideRequest error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/ride-requests/my
// Passenger fetches their own ride requests.
// ─────────────────────────────────────────────
export const getMyRideRequests = async (req, res) => {
  try {
    const requests = await RideRequest.find({ riderId: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};