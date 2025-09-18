/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soil-brown': '#8B4513',
        'leaf-green': '#228B22',
        'sky-blue': '#87CEEB',
        'harvest-gold': '#DAA520',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
