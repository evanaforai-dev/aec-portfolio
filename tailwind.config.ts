import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so the palette simply inverts between
        // light and dark while the hairline / no-shadow language stays fixed.
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        hairline: "var(--hairline)",
        // The single accent. Defined per theme in globals.css so it always
        // clears AA against the ground it is sitting on.
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1400px",
      },
      letterSpacing: {
        label: "0.14em",
      },
      transitionTimingFunction: {
        // Restrained, no-bounce easing used everywhere.
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
