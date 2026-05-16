import { useEffect, useState } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import SplashScreen from "../pages/Splashscreen";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
        background: "linear-gradient(to bottom right, #020617, #050816)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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

          {/*DASHBOARD*/}
          <Route path="/dashboard" element={
            <Dashboard
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />} 
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
