// src/components/Footer.jsx
//
// New component — no footer previously existed on these marketing pages.
// Built to close out the page properly: sitemap columns, legal/social row,
// and a closing line that echoes the hero's route-line motif rather than
// introducing a fourth unrelated visual idea.

import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function Footer({ darkMode }) {
  const s = surface(darkMode);
  const year = new Date().getFullYear();

  // CHANGE: links now carry a real `to` path instead of being label-only
  // placeholders with href="#". Contact us → /contact is confirmed; the
  // rest are reasonable guesses — adjust any that don't match your actual
  // routes in App.jsx.
  const columns = [
    {
      heading: "Ride",
      links: [
        { label: "Find a ride", to: "/search-rides" },
        { label: "Start a ride", to: "/driver-create-ride" },
        { label: "How pricing works", to: "/pricing" },
        { label: "Safety standards", to: "/safety" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Cosy", to: "/about" },
        { label: "Careers", to: "/careers" },
        { label: "Press", to: "/press" },
        { label: "Sustainability report", to: "/sustainability" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help center", to: "/help" },
        { label: "Trust & verification", to: "/trust" },
        { label: "Report an issue", to: "/contact" },
        { label: "Contact us", to: "/contact" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: darkMode ? colors.inkDark : colors.ink,
        color: "rgba(246,242,232,0.92)",
        fontFamily: fonts.body,
        padding: "90px 80px 0",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* TOP: brand + sitemap columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "40px",
            paddingBottom: "64px",
            borderBottom: "1px solid rgba(246,242,232,0.12)",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: fonts.display,
                fontSize: "28px",
                fontWeight: "600",
                marginBottom: "16px",
                color: colors.goldSoft,
              }}
            >
              Cosy
            </h3>
            <p
              style={{
                color: "rgba(246,242,232,0.6)",
                fontSize: "15px",
                lineHeight: "1.7",
                maxWidth: "260px",
                marginBottom: "24px",
              }}
            >
              Shared routes, verified people. Built to make the daily commute
              cheaper, calmer, and a little greener.
            </p>
            <div style={{ display: "flex", gap: "14px" }}>
              {[FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Cosy on social media"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(246,242,232,0.08)",
                    color: "rgba(246,242,232,0.85)",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(246,242,232,0.45)",
                  marginBottom: "22px",
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "14px" }}>
                    <Link
                      to={link.to}
                      style={{
                        color: "rgba(246,242,232,0.78)",
                        fontSize: "15px",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM: legal row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            padding: "28px 0",
          }}
        >
          <p style={{ color: "rgba(246,242,232,0.5)", fontSize: "13.5px" }}>
            © {year} The Cosy Company. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Privacy policy", "Terms of service", "Cookie settings"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "rgba(246,242,232,0.5)",
                  fontSize: "13.5px",
                  textDecoration: "none",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
