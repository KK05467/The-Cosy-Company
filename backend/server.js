import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import notificationRoutes
from "./routes/notificationRoutes.js";

import rideRequestRoutes
from "./routes/rideRequestRoutes.js";


import bookingRoutes
from "./routes/bookingRoutes.js";

dotenv.config()

connectDB()

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    //origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json())
app.use(
  "/api/bookings",
  bookingRoutes
);
app.use("/api/auth", authRoutes)
app.use(
  "/api/payment",
  paymentRoutes
);
app.use(
    "/api/notifications",
    notificationRoutes
);

app.use(
    "/api/ride-requests",
    rideRequestRoutes
);

app.use("/api/rides", rideRoutes);
app.use(
  "/api/bookings",
  bookingRoutes
);


app.get("/", (req, res) => {
  res.send("Cosy Backend Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})