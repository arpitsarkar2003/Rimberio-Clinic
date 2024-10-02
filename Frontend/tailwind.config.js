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
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
}

