# 🚗 Cosy Company

> **A Full-Stack Intelligent Ride Pooling Platform**

Cosy Company is a modern ride-sharing platform designed to make daily commuting **more affordable, sustainable, and convenient**. It connects verified drivers and passengers traveling along similar routes, enabling users to share rides, reduce transportation costs, decrease traffic congestion, and contribute to a greener environment.

The project is built using the **MERN Stack** with secure authentication, real-time ride management, booking workflows, and integrated online payments.

---

# 🌟 Key Features

### 👤 User Management

* Secure User Registration & Login
* JWT Authentication
* Password Reset using OTP
* User Profile Management
* Driver & Passenger Roles

---

### 🚘 Ride Management

* Publish a Ride
* Search Available Rides
* View Ride Details
* Driver Ride Dashboard
* Seat Availability Management

---

### 🎟 Booking System

* Book Available Seats
* Booking History
* Booking Details
* Booking Status Tracking
* Automatic Seat Updates

---

### 💳 Payment System

* Razorpay Payment Gateway
* Secure Order Creation
* Payment Verification
* Payment Status Management

---

### 📊 Dashboard

* Driver Dashboard
* Passenger Dashboard
* Booking Statistics
* Ride Statistics

---

# 🛠 Technology Stack

## Frontend

* React.js
* React Router DOM
* Framer Motion
* React Icons
* CSS (Inline Styling)
* Fetch API

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Razorpay
* Nodemailer
* Dotenv

---

## Database

* MongoDB Atlas

---

# 🏗 System Architecture

```text
                     +----------------------+
                     |      React Client    |
                     +----------+-----------+
                                |
                                |
                     REST API Requests
                                |
                                ▼
                    +-----------------------+
                    |    Express Server     |
                    +-----------+-----------+
                                |
        +-----------------------+------------------------+
        |                       |                        |
        ▼                       ▼                        ▼
 Authentication          Ride Management        Booking Management
        |                       |                        |
        +-----------+-----------+-----------+------------+
                    |                       |
                    ▼                       ▼
              MongoDB Database       Razorpay Gateway
```

---

# 📊 Complete User Flow

```text
                 User Visits Website
                          │
                          ▼
               Register / Login Account
                          │
                          ▼
                Search Available Rides
                          │
                          ▼
                  View Ride Details
                          │
                          ▼
                   Select Seat Count
                          │
                          ▼
                    Book the Ride
                          │
                          ▼
               Generate Razorpay Order
                          │
                          ▼
                 Complete Payment
                          │
                          ▼
               Verify Payment Signature
                          │
                          ▼
               Booking Successfully Created
                          │
                          ▼
               View Booking Dashboard
```

---

# 🗂 Backend Module Flow

```text
Client Request
      │
      ▼
Express Router
      │
      ▼
Authentication Middleware
      │
      ▼
Controller Layer
      │
      ▼
Business Logic
      │
      ▼
Mongoose Models
      │
      ▼
MongoDB
      │
      ▼
JSON Response
```

---

# 🧩 Frontend Flow

```text
Home Page
     │
     ├──────────────► Search Rides
     │                      │
     │                      ▼
     │               Ride Results
     │                      │
     │                      ▼
     │               Ride Details
     │                      │
     │                      ▼
     │                Book Ride
     │                      │
     │                      ▼
     │                  Payment
     │                      │
     │                      ▼
     │                My Bookings
     │
     ├──────────────► Publish Ride
     │
     ├──────────────► Profile
     │
     └──────────────► Dashboard
```

---

# 🗄 Database Collections

* Users
* Rides
* Bookings
* Payments
* Wallets

---

# 🔐 Security Features

* JWT Protected Routes
* Password Hashing using Bcrypt
* Environment Variable Protection
* Secure Payment Verification
* MongoDB Validation
* Authorization Middleware

---

# 🚀 Future Scope

* Live GPS Tracking
* Google Maps Integration
* Wallet & Cashback System
* AI Ride Recommendations
* Ride Chat System
* Driver Verification
* Push Notifications
* Ratings & Reviews
* Admin Dashboard
* Analytics Dashboard
* Ride Scheduling
* Emergency SOS
* QR Code Ride Verification

---

# 📈 Project Highlights

* Full Stack MERN Architecture
* RESTful API Design
* JWT-Based Authentication
* Secure Online Payments
* Responsive Modern UI
* Modular Code Structure
* Scalable Backend Design
* Professional Dashboard
* Real-World Ride Booking Workflow

---

# 👨‍💻 Developed By

**Keertan Kumar**

**B.Tech in Information Technology**

**International Institute of Information Technology (IIIT) Bhubaneswar**

---

# 📄 License

This project has been developed for educational, portfolio, and learning purposes.
