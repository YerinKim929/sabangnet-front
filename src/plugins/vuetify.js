/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "customDark",
    themes: {
      light: {},
      customDark: {
        dark: true,
        colors: {
          primary_blue: "#395A73",
          secondary_blue: "#A5D7E8",
          tertiary_blue: "#527A99",

          primary_red: "#C72C41",
          secondary_red: "#EE4540",
          tertiary_red: "#801336",

          primary_green: "#4E9F3D",
          secondary_green: "#183D3D",
          tertiary_green: "#040D12",

          title_gray: "#BDBDBD",
        },
      },
    },
  },
  typography: {
    fontFamily: "Nanum Gothic, sans-serif",
  },
});
