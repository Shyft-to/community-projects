import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#E33535",
        black: "#111",
        grey: {
          darker: "rgba(255, 255, 255, 0.15)",
          dark: "rgba(255, 255, 255, 0.60)",
          DEFAULT: "rgba(255, 255, 255, 0.75)",
          light: "#373737",
        },
        white: {
          DEFAULT: "#F4F4F4",
          lighter: "#fffc",
        },
        yellow: "#FBB901",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        fade: "fadeOut 3s ease-in-out",
        // typing: "typing 5s steps(50) infinite alternate, blink .7s infinite",
        // typing: "typing steps(50) alternate",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "0" },
          "25%": { opacity: "1" },
          "75%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
