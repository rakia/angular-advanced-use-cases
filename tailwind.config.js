/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,scss,ts}', './projects/shared/src/**/*.{html,ts}'],
  theme: {
    extend: {},
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px'
    },
  },
  plugins: [
    require('@tailwindcss/typography')({ modifiers: ['sm', 'lg'] })
  ],
}
