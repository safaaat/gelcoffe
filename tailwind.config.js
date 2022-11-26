/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-primary": "#4ade80",
        "color-hover": "#86efac",
        "color-hover-btn": "#16a34a",
        "color-900": "#103b22",
        "color-black": "#1e293b",
        "color-gray": "#64748b",
      },
      margin: {
        'jarak-componen': '5rem',
      },
      screens: {
        "360": "360px",
        "414": "414px",
        "640": "640px",
        "768": "768px",
        "880": "880px",
      },
    },
  },
  plugins: [],
}