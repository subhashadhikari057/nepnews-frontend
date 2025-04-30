// tailwind.config.js

module.exports = {
  darkMode: 'class', // ✅ Enables dark mode via a `dark` class or media preference

  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        navbar: "#0c0f1a", // ✅ Consistent navbar color
      },
    },
  },
  plugins: [],
}
