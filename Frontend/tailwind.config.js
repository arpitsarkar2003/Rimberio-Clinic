/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custommono: ['CustomMono', 'monospace'],
        customcali: ['CustomCali', 'monospace'],
      },
    },
  },
  plugins: [],
}

