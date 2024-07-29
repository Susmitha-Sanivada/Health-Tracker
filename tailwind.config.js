/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      colors: {
        light: {
          // Define light mode colors
          primary: "#7c7982",
          secondary: "#bbbabf",
          background: "#dddcde",
          text: "#272331",
        },

        // Define dark mode colors
        dark: {
          primary: "#76737e", // Darker primary color
          secondary: "#2f2b3a", // Darker secondary color
          background: "#1a1625", // Dark background color
          text: "#908d96", // Light text color for dark mode
        },
      },
      height: {
        "dvh-minus-16": "calc(100dvh - 64px)",
      },
    },
  },
  plugins: [],
};
