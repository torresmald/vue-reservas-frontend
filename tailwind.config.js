/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,jsx,tsx,ts}', './node_modules/vue-tailwind-datepicker/**/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'app': 'url("/image/1.jpg")'
      },
      colors: {
        "vtd-primary": colors.blue
      }
    },
  },
  plugins: [],
}

