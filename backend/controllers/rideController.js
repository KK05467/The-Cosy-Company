import Ride from "../models/Ride.js";
import { calculateFare }
from "../utils/fareCalculator.js";
import { geocodeLocation }
from "../utils/geocode.js"

import { isPointOnRoute }
from "../utils/isPointOnRoute.js";

export const createRide = async (req, res) => {

  try {

    const {

      from,
      to,

      startLocation,
      destinationLocation,

      routeCoordinates,

      distance,

      departureDate,
      departureTime,

      vehicleName,
      vehicleNumber,

      vehicleType,

      totalSeats

    } = req.body;

    const fare =
      calculateFare(
        distance,
        vehicleType,
        false,
        new Date().getHours()
      );

    const ride =
      await Ride.create({

        driverId: req.user._id,

        from,
        to,

        startLocation,
        destinationLocation,

        routeCoordinates,

        distance,

        departureDate,
        departureTime,

        vehicleName,
        vehicleNumber,

        vehicleType,

        totalSeats,

        availableSeats: totalSeats,

        fixedFare:
          fare.totalFare

      });

    res.status(201).json({
      success: true,
      ride
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
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
export const searchRides = async (
  req,
  res
) => {

  try {

    const { from, to } = req.query;

    const riderStart =
      await geocodeLocation(from);

    const riderEnd =
      await geocodeLocation(to);

    const rides =
      await Ride.find({
        status: "active",
        availableSeats: {
          $gt: 0
        }
      });

    const matchedRides = [];

    for (const ride of rides) {

      const startExists =
        isPointOnRoute(
          riderStart,
          ride.routeCoordinates
        );

      const endExists =
        isPointOnRoute(
          riderEnd,
          ride.routeCoordinates
        );

      if (
        startExists &&
        endExists
      ) {

        matchedRides.push(ride);

      }

    }

    res.json({
      success: true,
      count:
        matchedRides.length,
      rides:
        matchedRides
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
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
export const updateLocation =
async (
req,
res
) => {

try {

const {
lat,
lng
}
= req.body;

const ride =
await Ride.findOne({
driverId:
req.user._id,
status:"active"
});

if(!ride){

return res.status(404).json({
success:false,
message:"Ride not found"
});

}

ride.currentLocation = {
lat,
lng
};

await ride.save();

res.json({
success:true
});

}

catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};
export const getCurrentLocation =
async (
req,
res
)=>{

try{

const ride =
await Ride.findById(
req.params.id
);

if(!ride){

return res.status(404).json({
success:false
});

}

res.json({
success:true,
location:
ride.currentLocation
});

}

catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};
export const startRide = async (req, res) => {

  try {

    const ride = await Ride.findById(
      req.params.id
    );

    if (!ride) {

      return res.status(404).json({
        success: false,
        message: "Ride not found"
      });

    }

    ride.rideStatus = "started";

    await ride.save();

    res.json({
      success: true,
      ride
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const completeRide = async (req, res) => {

  try {

    const ride = await Ride.findById(
      req.params.id
    );

    if (!ride) {

      return res.status(404).json({
        success: false,
        message: "Ride not found"
      });

    }

    ride.rideStatus = "completed";

    await ride.save();

    res.json({
      success: true,
      ride
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};