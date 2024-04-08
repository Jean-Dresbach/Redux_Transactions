import { createTheme } from "@mui/material"
import { orange, lightGreen, red, grey } from "@mui/material/colors"

export const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: orange[400]
    },
    error: {
      main: red[400]
    },
    success: {
      main: lightGreen[500]
    },
    background: {
      default: "#0b1927",
      paper: "#0b1927"
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: grey[700], opacity: 1 },
        arrow: { color: grey[700] }
      }
    }
  }
})
