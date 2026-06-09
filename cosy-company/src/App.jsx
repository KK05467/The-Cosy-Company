import { useEffect, useState } from "react"

import { Routes, Route, useLocation } from "react-router-dom"

import { AnimatePresence } from "framer-motion"

import SplashScreen from "../pages/Splashscreen"

import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Signup from "../pages/Signup"
import Wallet from "../pages/Wallet"
import Profile from "../pages/Profile"
import Settings from "../pages/Settings"
import EditProfile from "../components/EditProfile"
import PaymentSuccess from "../pages/PaymentSuccess"
import PaymentFailed from "../pages/PaymentFailed"
import DriverCreateRide from "../pages/DriverCreateRide"
import NotFound from "../pages/NotFound"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"
import Bookings from "../pages/Bookings"
import Pricing from "../pages/Pricing"
import HowItWorks from "../pages/HowItWorks"
import FAQ from "../pages/FAQ"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Payment from "../pages/payments"
import SearchRides from "../pages/SearchRides"
import RideResults from "../pages/RideResults"
import RideDetails from "../pages/RideDetails"

import Test from "/Test"



function App() {

  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)

  const location = useLocation()

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)

  }, [])

  if (loading) {
    return <SplashScreen />
  }

  return (
    <>

   <div
  style={{
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    background: darkMode
      ? "linear-gradient(to bottom right, #020617, #050816)"
      : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
    fontFamily: "Inter, sans-serif",
  }}
>
  <Navbar
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  />

  <AnimatePresence mode="wait">
    <Routes
      location={location}
      key={location.pathname}
    >

          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />


          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <Login
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* SEARCH RIDES */}
          <Route
            path="/search-rides"
            element={
              <SearchRides
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* RIDE RESULTS */}
          <Route
            path="/ride-results"
            element={
              <RideResults
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* RIDE DETAILS */}
          <Route
  path="/ride/:id"
  element={<RideDetails darkMode={darkMode} />}
/>

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <Dashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
            
          />

          {/* PAYMENTS */}
          <Route
            path="/payment"
            element={
              <Payment
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
            
          />
          
          {/* BOOKINGS */}
          <Route
            path="/bookings"
            element={
              <Bookings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={
              <Signup
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* FORGOT PASSWORD */}
          <Route
            path="/forgot-password"
            element={
              <ForgotPassword
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />





            <Route
  path="/test"
  element={<Test />}
/>



          {/* RESET PASSWORD */}
          <Route
            path="/reset-password"
            element={
              <ResetPassword
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />


          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <Profile
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <About
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={
              <Contact
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* FAQ */}
          <Route
            path="/faq"
            element={
              <FAQ
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* HOW IT WORKS */}
          <Route
            path="/how-it-works"
            element={
              <HowItWorks
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* PRICING */}
          <Route
            path="/pricing"
            element={
              <Pricing
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          {/* SETTINGS */}
          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* EDIT PROFILE */}
          <Route
            path="/edit-profile"
            element={
              <EditProfile
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          
          {/* PAYMENT FAILED */}
          <Route
            path="/payment-failed"
            element={
              <PaymentFailed
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* PAYMENT SUCCESS */}
          <Route
            path="/payment-success"
            element={
              <PaymentSuccess
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          
          {/* ERROR 404 */}
          <Route
            path="/not-found"
            element={
              <NotFound
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* DRIVER CREATE RIDE */}
          <Route
            path="/driver-create-ride"
            element={
              <DriverCreateRide
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          
           {/* WALLET */}
          <Route
            path="/wallet"
            element={
              <Wallet
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          

        </Routes>

      </AnimatePresence>

    </div>
    </>

  )
}

export default App