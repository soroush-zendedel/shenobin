/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shenoDark: '#1e272e',
        shenoCyan: '#00d2d3',
        shenoGray: '#2d3436',
        glassBg: 'rgba(30, 39, 46, 0.65)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'Vazirmatn', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
