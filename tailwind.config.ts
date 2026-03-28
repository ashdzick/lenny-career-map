import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fdf8f0",
          100: "#faefd8",
          200: "#f5d9a8",
          300: "#efc070",
          400: "#e89a3c",
          500: "#e07b39",
          600: "#c96a28",
          700: "#a54e1f",
          800: "#7d3a18",
          900: "#3d1f0a",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1a1a1a",
            h2: {
              color: "#3d1f0a",
              fontWeight: "700",
            },
            h3: {
              color: "#3d1f0a",
              fontWeight: "600",
            },
            strong: {
              color: "#1a1a1a",
            },
            a: {
              color: "#c96a28",
              "&:hover": {
                color: "#a54e1f",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
