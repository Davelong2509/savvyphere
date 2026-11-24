/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        aubergine: "#432449",
        purple: "#745681",
        lavender: "#EAE2EE",
        ivory: "#F8F7F4",
        charcoal: "#26242A",
        muted: "#77737A"
      },
      fontFamily: {
        display: ["DM Serif Display", "Georgia", "serif"],
        sans: ["DM Sans", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};