import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Setting default colors
      colors: {
        background: "#ffffff", // Default background color: white
        text: "#000000", // Default text color: black
        primary: {
          DEFAULT: "#48bb78", // Primary color: green-500
        },
        secondary: {
          DEFAULT: "#68d391", // Secondary color: green-400
        },
      },
      backgroundImage: {
        'custom-image': "url('/logo.png')",
      },
    },
  },
  plugins: [],
};

export default config;
