/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas:  'oklch(0.09 0 0 / <alpha-value>)',
        surface: 'oklch(0.13 0 0 / <alpha-value>)',
        ink:     'oklch(0.96 0 0 / <alpha-value>)',
        dim:     'oklch(0.58 0 0 / <alpha-value>)',
        haze:    'oklch(0.38 0 0 / <alpha-value>)',
        wire:    'oklch(0.18 0 0 / <alpha-value>)',
        signal:  'oklch(0.74 0.09 215 / <alpha-value>)',
      },
      screens: {
        xs: '350px',
      },
    },
  },
  plugins: [],
}
