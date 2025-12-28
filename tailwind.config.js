/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Simplified color palette: Blue, White, Black
        primary: {
          light: '#FDFDFD', // White background
          dark: '#0F1012', // Dark mode base (near black)
        },
        accent: {
          primary: '#3B82F6', // Bright blue-500
          'primary-dark': '#2563EB', // Blue-600 for darker shades
          'primary-light': '#60A5FA', // Blue-400 for lighter shades
        },
        text: {
          light: '#111827', // Near black (gray-900)
          dark: '#E5E7EB', // Light gray (gray-200)
        },
        
        // Techie theme colors (simplified)
        techie: {
          bg: '#121212',
          primary: '#3B82F6', // Same blue
          text: '#E5E7EB',
        }
      },
      fontFamily: {
        // Normal theme fonts - Using Inter (very similar to Google Sans)
        cursive: [' "Dancing Script" ',' "Caveat" ','cursive'],
        playFair: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        lato: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        
        // Techie theme fonts
        mono: ['"Fira Code"', 'monospace'],
        ibm: ['"IBM Plex Mono"', 'monospace'],
      },
      backdropBlur: {
        md: '12px',
      },
      animation: {
        blob: "blob 7s infinite",
        float: "float 4s ease-in-out infinite",
        cursor: "cursor .6s linear infinite alternate",
        typing: "typing 3.5s steps(40, end)",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
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
        cursor: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      screens: {
        "xs": "350px",
      },
    },
  },
  plugins: [],
}

