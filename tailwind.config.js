/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#13131A',
        'card-bg': '#1C1C26',
        accent: '#6C5DD3',
        'text-secondary': '#808191',
        'border-color': '#272730',
      },
    },
  },
  plugins: [],
}