const colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
  content: ["index.html", "src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: {
        50: "#F5F2EF",
        100: "#EDE7E3",
        200: "#DDD1CA",
        300: "#CDBCB1",
        400: "#BDA798",
        500: "#AD917F",
        600: "#9E7C67",
        700: "#866856",
        800: "#6D5546",
        900: "#554136",
      },
    },
    extend: {},
  },
  plugins: [],
};
