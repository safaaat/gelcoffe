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
        "375": "375px",
        "390": "390px",
        "412": "412px",
        "450": "450px",
        "500": "500px",
        "640": "640px",
        "700": "700px",
        "768": "768px",
        "880": "880px",
        "950": "950px",
      },
    },
  },
  plugins: [],
}