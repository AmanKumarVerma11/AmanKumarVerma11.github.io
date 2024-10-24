/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: [' "Dancing Script" ',' "Caveat" ','cursive'],
        playFair: ['"Playfair Display"', 'serif'],
        lato: ['"Lato"', 'sans-serif'],
      },
      animation: {
        blob: "blob 7s infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { borderRadius: "50% 50% 50% 50%" },
          "25%": { borderRadius: "60% 40% 60% 40%" },
          "50%": { borderRadius: "50% 60% 40% 60%" },
          "75%": { borderRadius: "40% 60% 60% 40%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      screens: {
        "xs": "350px",
      },
    },
  },
  plugins: [],
}

