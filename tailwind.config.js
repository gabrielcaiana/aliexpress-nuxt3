/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#FD374F",
          DEFAULT: "#FF4646",
          light: "#FF5353",
        },
        success: {
          DEFAULT: "#009A66",
        },
        warning: {
          darkest: "#FF851A",
          dark: "#FFAC2C",
          DEFAULT: "#FFD000",
        },
        brown: {
          DEFAULT: "#C08562",
        },
        neutral: {
          700: "#252525",
          600: "#282828",
          500: "#333333",
          400: "#999999",
          350: "#757575",
          300: "#E8E8E8",
          200: "#f2f2f2",
          100: "#FAFAFA",
          50: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
