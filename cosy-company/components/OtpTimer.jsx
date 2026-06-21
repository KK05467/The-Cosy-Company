// src/components/OtpTimer.jsx
//
// REDESIGN NOTES (logic unchanged — the setInterval countdown, the
// expiryTime - Date.now() diff calculation, and the cleanup on unmount are
// all exactly as before):
// - Previously hardcoded to one blue (#3b82f6) regardless of theme, and
//   took no darkMode prop at all — so it would look mismatched against
//   both the dark ink and light paper backgrounds used everywhere else.
//   Now reads from the shared surface()/colors/fonts tokens like the rest
//   of the app, and accepts darkMode as a prop.
// - Digits now render in the mono face used for other numeric readouts in
//   this app (route codes, fares) instead of the default body font.
// - BUG FIX: previously there was no visual distinction once the timer hit
//   zero — a stale "0:00" rendered in the same color as a fresh, valid
//   countdown, which could read as "still valid" at a glance. Added a
//   distinct expired state (rust color + "OTP expired" message) once
//   timeLeft reaches 0.

import { useEffect, useState } from "react";
import { colors, fonts, surface } from "../styles/tokens";

export default function OtpTimer({ expiryTime, darkMode }) {
  const [timeLeft, setTimeLeft] = useState(expiryTime - Date.now());
  const s = surface(darkMode);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = expiryTime - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
      if (diff <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const format = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const expired = timeLeft <= 0;

  return (
    <p
      style={{
        color: expired ? colors.rust : s.accent,
        fontSize: "13px",
        fontFamily: fonts.body,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        margin: 0,
      }}
    >
      {expired ? (
        "OTP expired — request a new one"
      ) : (
        <>
          OTP valid for{" "}
          <span style={{ fontFamily: fonts.mono, fontWeight: "600" }}>
            {format(timeLeft)}
          </span>
        </>
      )}
    </p>
  );
}
