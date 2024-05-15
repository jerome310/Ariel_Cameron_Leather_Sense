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
      opacity: {
        75: ".75",
      },
    },
  },
  plugins: [],
};