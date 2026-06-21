// src/styles/tokens.js
//
// Cosy design tokens — shared across Home, Features, Stats, Testimonial, Footer.
// One source of truth so sections don't drift into mismatched ad-hoc colors,
// which was a big part of why the old pages felt cheap (every section had its
// own slightly-different translucent-card-on-gradient treatment).

export const colors = {
  // Ink replaces pure black — a near-black forest tone keeps dark mode feeling
  // like "Cosy at night," not "default dark theme."
  inkDark: "#0E1813",
  ink: "#13231C",
  inkSoft: "#1B2E25",

  paper: "#F6F2E8",
  paperSoft: "#EDE6D4",

  forest: "#1F4D3A",
  forestDeep: "#163A2B",
  moss: "#5C7A63",

  gold: "#C9A227",
  goldSoft: "#E1C76B",

  rust: "#A8452F", // used sparingly — driver-mode signal, never decorative

  line: "rgba(31,77,58,0.16)",
  lineDark: "rgba(201,162,39,0.18)",
};

export const fonts = {
  display: '"Fraunces", "Iowan Old Style", Georgia, serif',
  body: '"Inter", -apple-system, sans-serif',
  mono: '"IBM Plex Mono", "SF Mono", monospace',
};

// Single helper so every section reads dark/light off the same two values
// instead of re-deriving a gradient string seven different times.
export function surface(darkMode) {
  return {
    bg: darkMode ? colors.ink : colors.paper,
    bgSoft: darkMode ? colors.inkSoft : colors.paperSoft,
    text: darkMode ? colors.paper : colors.ink,
    textMuted: darkMode ? "rgba(246,242,232,0.62)" : "rgba(19,35,28,0.62)",
    line: darkMode ? colors.lineDark : colors.line,
    accent: darkMode ? colors.goldSoft : colors.forest,
  };
}