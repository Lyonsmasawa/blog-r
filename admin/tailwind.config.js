/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        bottom: "bottom",
      },
    },
  },
  plugins: [],
};
