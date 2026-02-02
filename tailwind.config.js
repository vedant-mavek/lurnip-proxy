
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
        surface: '#080808',
        'surface-soft': '#121212',
        'border-white': 'rgba(255, 255, 255, 0.08)',
      },
      borderRadius: {
        pill: '100px',
        card: '40px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
