import Ride from "../models/Ride.js";

export const createRide = async (req, res) => {
  try {

    const {
      from,
      to,
      stops,
      departureDate,
      departureTime,
      vehicleName,
      vehicleNumber,
      totalSeats,
      fixedFare,
    } = req.body;

    const ride = await Ride.create({
      driverId: req.user._id,
      from,
      to,
      stops,
      departureDate,
      departureTime,
      vehicleName,
      vehicleNumber,
      totalSeats,
      availableSeats: totalSeats,
      fixedFare,
    });

    res.status(201).json({
      success: true,
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMyRides = async (req, res) => {
  try {

    const rides = await Ride.find({
      driverId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
  
};
export const searchRides = async (req, res) => {
  try {

    const { from, to } = req.query;

    const rides = await Ride.find({
      from: { $regex: new RegExp(`^${from}$`, "i") },
      to: { $regex: new RegExp(`^${to}$`, "i") },
      status: "active",
      availableSeats: { $gt: 0 },
    })
      .populate("driverId", "name rating phone")
      .sort({ departureDate: 1 });

    res.status(200).json({
      success: true,
      count: rides.length,
      rides,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getRideById = async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.id)
      .populate(
        "driverId",
        "name phone rating totalTrips location"
      );

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    res.status(200).json({
      success: true,
      ride,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};