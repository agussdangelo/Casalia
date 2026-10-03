/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clay: "#ac4d29",
        ink: "#211c16",
        cream: "#fbf8f4",
        sand: "#f3ebe4",
        sage: "#397859",
      },
      fontFamily: {
        sans: ["DM Sans", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
