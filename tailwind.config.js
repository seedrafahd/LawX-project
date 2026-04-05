/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "variable-collection": "var(--variable-collection)",
        "variable-collection-blue2-color":
          "var(--variable-collection-blue2-color)",
        "variable-collection-blue3-color":
          "var(--variable-collection-blue3-color)",
        "variable-collection-CART-color":
          "var(--variable-collection-CART-color)",
        "variable-collection-error-color":
          "var(--variable-collection-error-color)",
        "variable-collection-grey-color":
          "var(--variable-collection-grey-color)",
        "variable-collection-GREY-textcolor":
          "var(--variable-collection-GREY-textcolor)",
        "variable-collection-navbar-color":
          "var(--variable-collection-navbar-color)",
        "variable-collection-navbarbg-color":
          "var(--variable-collection-navbarbg-color)",
        "variable-collection-primary-color":
          "var(--variable-collection-primary-color)",
        "variable-collection-SCREEN-BG-color":
          "var(--variable-collection-SCREEN-BG-color)",
        "variable-collection-strokes-color":
          "var(--variable-collection-strokes-color)",
        "variable-collection-sucess-color":
          "var(--variable-collection-sucess-color)",
        "variable-collection-warning-color":
          "var(--variable-collection-warning-color)",
      },
    },
  },
  plugins: [],
};
