/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3F51B5',
        surface: '#F9FAFB',
      },
      boxShadow: {
        'custom': '0 8px 20px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
