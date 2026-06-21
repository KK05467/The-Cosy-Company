// src/components/Navbar.jsx
//
// REDESIGN NOTES (visual only — every hook, handler, and piece of state
// below is unchanged: the loggedIn check, scroll listener, handleLogout,
// mobileOpen toggle, and the publicLinks/memberLinks split):
// - Replaced the glass-pill buttons and ad-hoc accent colors with the
//   shared surface()/colors/fonts tokens used across Home/Contact/Footer.
// - Active link indicator changed from color+weight alone to an underline
//   tick (matches the hairline-rule language used throughout the rest of
//   the redesign) so it doesn't rely on color contrast by itself.
// - Wordmark now uses Fraunces (display font) instead of system bold, to
//   match the wordmark treatment in SplashScreen.jsx.
//
// ROUTE NOTE: this file is the authoritative source for real paths
// (/about, /how-it-works, /pricing, /faq, /contact, /my-bookings, /wallet).
// I've already gone back and fixed one conflict this exposed: an earlier
// PaymentSuccess.jsx button pointed at /bookings, which doesn't match your
// real /my-bookings route — that's been corrected. Some other links I
// guessed earlier (Footer.jsx's /help, /safety, /trust, /careers, /press,
// /sustainability) aren't confirmed by this file either way — worth
// telling me if those pages exist so I can verify or fix those too.

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userMode");
    setLoggedIn(false);
    navigate("/login");
  };

  const publicLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "How it Works", path: "/how-it-works" },
    { title: "Pricing", path: "/pricing" },
    { title: "FAQ", path: "/faq" },
    { title: "Contact", path: "/contact" },
  ];

  const memberLinks = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Search Rides", path: "/search-rides" },
    { title: "My Bookings", path: "/my-bookings" },
    { title: "Wallet", path: "/wallet" },
  ];

  const navLinks = loggedIn ? memberLinks : publicLinks;
  const s = surface(darkMode);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        padding: "16px 56px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        fontFamily: fonts.body,
        background: scrolled ? s.bg : "transparent",
        borderBottom: scrolled ? `1px solid ${s.line}` : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* LOGO */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "26px",
              fontWeight: "600",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Cosy
          </h1>
          <p
            style={{
              fontFamily: fonts.mono,
              color: s.accent,
              fontSize: "9.5px",
              letterSpacing: "2.5px",
              marginTop: "5px",
              fontWeight: "500",
            }}
          >
            RIDE COSY · DRIVE COSY
          </p>
        </div>
      </Link>

      {/* NAV LINKS — desktop */}
      <div className="cosy-navlinks" style={{ display: "flex", gap: "34px", alignItems: "center" }}>
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={i} to={link.path} style={{ textDecoration: "none" }}>
              <div style={{ position: "relative", paddingBottom: "4px" }}>
                <motion.p
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: isActive ? s.text : s.textMuted,
                    fontSize: "15px",
                    fontWeight: isActive ? "600" : "500",
                    cursor: "pointer",
                    margin: 0,
                  }}
                >
                  {link.title}
                </motion.p>
                {isActive && (
                  <motion.div
                    layoutId="navActiveTick"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: s.accent,
                      borderRadius: "1px",
                    }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* THEME TOGGLE */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: s.bgSoft,
            border: `1px solid ${s.line}`,
            color: s.text,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>

        {loggedIn ? (
          <>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: s.bgSoft,
                  border: `1px solid ${s.line}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: s.accent,
                  fontSize: "21px",
                  cursor: "pointer",
                }}
              >
                <FaUserCircle />
              </motion.div>
            </Link>

            <motion.button
              onClick={handleLogout}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "11px 22px",
                borderRadius: "12px",
                background: darkMode
                  ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                  : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                border: "none",
                color: darkMode ? colors.ink : "#fff",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: fonts.body,
                cursor: "pointer",
              }}
            >
              Log out
            </motion.button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "11px 20px",
                  borderRadius: "12px",
                  background: "transparent",
                  border: `1px solid ${s.line}`,
                  color: s.text,
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: fonts.body,
                  cursor: "pointer",
                }}
              >
                Log in
              </motion.button>
            </Link>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "11px 22px",
                  borderRadius: "12px",
                  background: darkMode
                    ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                    : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                  border: "none",
                  color: darkMode ? colors.ink : "#fff",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: fonts.body,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Sign up
              </motion.button>
            </Link>
          </>
        )}

        {/* MOBILE MENU TOGGLE */}
        <button
          className="cosy-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: s.bgSoft,
            border: `1px solid ${s.line}`,
            color: s.text,
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            padding: "20px 24px",
            background: s.bg,
            borderBottom: `1px solid ${s.line}`,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                textDecoration: "none",
                color: s.text,
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: fonts.body,
              }}
            >
              {link.title}
            </Link>
          ))}
        </motion.div>
      )}

      {/* Responsive behavior without a separate CSS file */}
      <style>{`
        @media (max-width: 900px) {
          .cosy-navlinks { display: none !important; }
          .cosy-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}

export default Navbar;
