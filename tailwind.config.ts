import type { Config } from "tailwindcss";

/**
 * Tailwind is configured with the approved RANDA design tokens.
 *
 * Preflight (Tailwind's CSS reset) is disabled on purpose: the approved
 * prototype was designed against standard browser defaults, and the
 * design-system styles in `src/app/globals.css` rely on them. Keeping
 * preflight off guarantees the site looks identical to the prototype.
 * Utilities and the tokens below can still be used in new components,
 * e.g. `text-navy`, `bg-ivory`, `font-serif`.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#163A5F", deep: "#0F2A45" },
        gold: { DEFAULT: "#D4A017", deep: "#8A6508" },
        ivory: "#FAF9F5",
        sand: "#F3EEE4",
        ink: "#0E1A28",
        text: { DEFAULT: "#2B3644", muted: "#4A5563" },
        line: { DEFAULT: "#E4DCCB", strong: "#D9CFBB" },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Cormorant", "Garamond", "'Times New Roman'", "serif"],
        sans: ["Montserrat", "system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
      },
      maxWidth: {
        site: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
