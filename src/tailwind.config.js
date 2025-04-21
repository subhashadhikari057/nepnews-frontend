// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],  // <--- This is what @apply font-sans uses
           navbar: "#0c0f1a",
        },
      },
    },
    plugins: [],
  }
  