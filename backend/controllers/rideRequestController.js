import RideRequest from "../models/RideRequest.js";
import Notification from "../models/Notification.js";
import { isSameRoute } from "../utils/routeMatcher.js";

export const createRideRequest =
async (req, res) => {

try {

const {
pickupPoint,
dropPoint,
seatsRequired
}
= req.body;

const request =
await RideRequest.create({

riderId:
req.user._id,

pickupPoint,
dropPoint,
seatsRequired

});

const rides =
await Ride.find({
status:"active",
availableSeats:{
$gte:seatsRequired
}
});

let matchedDrivers = [];

for(const ride of rides){

const matched =
isSameRoute(
ride.from,
ride.to,
pickupPoint,
dropPoint
);

if(matched){

matchedDrivers.push(
ride.driverId
);

await Notification.create({

riderId:
req.user._id,

driverId:
ride.driverId,

rideId:
ride._id

});

}

}

res.status(201).json({

success:true,

request,

matchedDrivers

});

}

catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};