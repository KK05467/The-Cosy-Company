
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SplashScreen from "../pages/Splashscreen";

import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import Wallet from "../pages/Wallet";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import EditProfile from "../components/EditProfile";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import DriverCreateRide from "../pages/DriverCreateRide";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Bookings from "../pages/Bookings";
import Pricing from "../pages/Pricing";
import HowItWorks from "../pages/HowItWorks";
import FAQ from "../pages/FAQ";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Payment from "../pages/payments";
import SearchRides from "../pages/SearchRides";
import RideResults from "../pages/RideResults";
import RideDetails from "../pages/RideDetails";
import DriverNotifications from "../pages/DriverNotifications";
import DriverMyRides from "../pages/DriverMyRides";
import MyBookings from "../pages/MyBookings";
import Footer from "../components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background: darkMode
          ? "linear-gradient(135deg,#0F1115,#171923)"
          : "linear-gradient(135deg,#F5F1E8,#EAE3D2)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* HOME */}
          <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
          


          {/* AUTH */}
          <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/signup" element={<Signup darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/forgot-password" element={<ForgotPassword darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/reset-password" element={<ResetPassword darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* RIDES — RIDER SIDE */}
          <Route path="/search-rides" element={<SearchRides darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/ride-results" element={<RideResults darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/ride/:id" element={<RideDetails darkMode={darkMode} />} />
          <Route path="/bookings" element={<Bookings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/my-bookings" element={<MyBookings darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* RIDES — DRIVER SIDE */}
          <Route path="/driver-create-ride" element={<DriverCreateRide darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/driver/my-rides" element={<DriverMyRides darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/notifications" element={<DriverNotifications darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* PAYMENTS */}
          <Route path="/payment" element={<Payment darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/payment-success" element={<PaymentSuccess darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/payment-failed" element={<PaymentFailed darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/wallet" element={<Wallet darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* PROFILE */}
          <Route path="/profile" element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/edit-profile" element={<EditProfile darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* STATIC / INFO PAGES */}
          <Route path="/about" element={<About darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/faq" element={<FAQ darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/how-it-works" element={<HowItWorks darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/pricing" element={<Pricing darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* 404 — catch-all */}
          <Route path="/not-found" element={<NotFound darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="*" element={<NotFound darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
         <Footer darkMode={darkMode} />
      </AnimatePresence>
    </div>
  );
}

export default App;
