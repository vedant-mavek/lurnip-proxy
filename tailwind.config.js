
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./views/**/*.{ts,tsx}",
    "./contexts/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'accent-lime': '#D8FF5B',
        'accent-blue': '#4B89FF',
        'accent-pink': '#FF3FD3',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
