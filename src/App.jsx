import { useEffect, useState } from "react"

import { Routes, Route, useLocation } from "react-router-dom"

import { AnimatePresence } from "framer-motion"

import SplashScreen from "../pages/Splashscreen"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Signup from "../pages/Signup"
import Wallet from "../pages/Wallet"
import Profile from "../pages/Profile"
import Settings from "../pages/Settings"
import EditProfile from "../components/EditProfile"
import PaymentSuccess from "../pages/PaymentSuccess"
import PaymentFailed from "../pages/PaymentFailed"

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

  )
}

export default App