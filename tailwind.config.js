/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          purple: '#9D4EDD',
          pink: '#FF006E',
          blue: '#3A86FF',
          green: '#06FFA5',
        }
      }
    },
  },
  plugins: [],
}
