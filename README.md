# 🚗 Cosy Company Backend

A scalable backend for **Cosy Company**, a smart ride-pooling platform that connects drivers and passengers for safe, affordable, and eco-friendly travel. Built using the **MERN stack**, it provides secure authentication, ride management, booking, payments, and user profile management.

---

# 🚀 Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 🔑 Forgot Password & Reset Password
- 📝 User Profile Management
- 🚘 Create Ride
- 🔍 Search Available Rides
- 📋 View Ride Details
- 🚗 Driver's Ride Dashboard
- 🎟 Book Ride
- 📑 View My Bookings
- 💳 Razorpay Payment Integration
- 🔒 Protected Routes
- 📦 MongoDB Database
- 🌐 REST API Architecture

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Razorpay
- Dotenv
- CORS

---

# 📂 Folder Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   ├── paymentController.js
│   └── rideController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Booking.js
│   ├── Payment.js
│   ├── Ride.js
│   ├── User.js
│   └── Wallet.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── paymentRoutes.js
│   └── rideRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to backend directory

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

# ▶️ Run the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/forgot-password` | Send OTP |
| POST | `/api/auth/reset-password` | Reset Password |
| GET | `/api/auth/profile` | Get Profile |
| PUT | `/api/auth/profile` | Update Profile |

---

## Ride APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/rides` | Create Ride |
| GET | `/api/rides/search` | Search Rides |
| GET | `/api/rides/my-rides` | Driver's Rides |
| GET | `/api/rides/:id` | Ride Details |

---

## Booking APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/bookings` | Create Booking |
| GET | `/api/bookings/my` | My Bookings |
| GET | `/api/bookings/:id` | Booking Details |

---

## Payment APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payment/create-order` | Create Razorpay Order |
| POST | `/api/payment/verify-payment` | Verify Payment |

---

# 🔐 Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📌 Project Workflow

```
User Signup/Login
        │
        ▼
Search Available Rides
        │
        ▼
View Ride Details
        │
        ▼
Book Ride
        │
        ▼
Payment
        │
        ▼
Booking Confirmation
```

---

# 📷 Core Modules

### Authentication

- JWT Authentication
- Password Hashing
- Forgot Password
- Reset Password
- Protected APIs

---

### Ride Management

- Publish Ride
- Search Ride
- Ride Details
- Driver Dashboard

---

### Booking System

- Reserve Seats
- Seat Availability
- Booking Status
- Booking History

---

### Payment System

- Razorpay Order Creation
- Payment Verification
- Payment Status

---

# 🔒 Security

- JWT Authentication
- Password Hashing using Bcrypt
- Protected API Routes
- Environment Variables
- MongoDB Validation
- Secure Payment Verification

---

# 🌱 Future Enhancements

- Live Ride Tracking
- Google Maps Integration
- Wallet System
- Ride Cancellation
- Driver Verification
- Reviews & Ratings
- Notifications
- Chat Between Driver & Passenger
- Admin Dashboard
- AI Ride Recommendations

---

# 👨‍💻 Developer

**Keertan Kumar Singh**

B.Tech Information Technology  
IIIT Bhubaneswar

---

# 📄 License

This project is developed for educational and portfolio purposes.
