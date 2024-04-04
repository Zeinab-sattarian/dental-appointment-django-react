module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#007F73", // dark green
        yellowColor: "#FFF455", //yellow
        purpleColor: "#FFC700", //orange
        irisBlueColor: "#4CCD99", //light green
        headingColor: "#1F1717", //black
        textColor: "#4E545F", //black
        green: "#FFBD35"
      },

      boxShadow: {
        panelShadow: "rgb(135, 169, 34) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}