/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/customers/*.liquid",
    "./templates/*.liquid",
  ],
  theme: {
    extend: {
      height: {
        94: "22rem",
      },
      fontFamily: {
        comic: ['"Comic Neue"', "cursive"],
      },
      screens: {
      'smallestDevices': "320px", // Custom breakpoint for 320px
      'mobileWindowScreen': "499px" // Custom breakpoint for 499px
      },
    },
  },
  plugins: [],
};