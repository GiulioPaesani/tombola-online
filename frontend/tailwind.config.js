/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: {
        500: "#E35B48",
        950: "#A42F1F",
      },
      secondary: {
        500: "#FFF1E6",
        600: "#FFEBDB",
        700: "#FFE5D1",
      },
      neutral: {
        950: "#181818",
      },
    },
    fontFamily: {
      rubik: ["Rubik"],
    },
    extend: {
      boxShadow: {
        offset: "0 8px 0 #A42F1F",
        noOffset: "0 0 0 #A42F1F",
      },
    },
  },
  plugins: [],
};
