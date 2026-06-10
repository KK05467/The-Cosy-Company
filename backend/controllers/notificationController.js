import Notification from "../models/Notification.js";
import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";

export const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      driverId: req.user._id,
    })
      .populate("riderId", "name phone")
      .populate("rideId")
      .populate("bookingId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const acceptNotification = async (
  req,
  res
) => {

  try {

    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });

    }

    notification.status = "accepted";

    await notification.save();

    const booking =
      await Booking.findById(
        notification.bookingId
      );

    booking.bookingStatus =
      "confirmed";

    await booking.save();

    res.json({
      success: true,
      notification
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
export const rejectNotification = async (
  req,
  res
) => {

  try {

    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });

    }

    notification.status = "rejected";

    await notification.save();

    const booking =
      await Booking.findById(
        notification.bookingId
      );

    booking.bookingStatus =
      "cancelled";

    await booking.save();

    const ride =
      await Ride.findById(
        booking.rideId
      );

    ride.availableSeats +=
      booking.seatsBooked;

    await ride.save();

    res.json({
      success: true,
      notification
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};