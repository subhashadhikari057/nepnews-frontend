// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],  // Only font here
      },
      colors: {
        navbar: "#0c0f1a", // Color must be inside colors
      },
    },
  },
  plugins: [],
}
