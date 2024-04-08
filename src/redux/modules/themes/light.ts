import { createTheme } from "@mui/material"
import { grey, lightGreen, orange, red } from "@mui/material/colors"

export const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: orange[600]
    },
    error: {
      main: red[600]
    },
    success: {
      main: lightGreen[700]
    },
    background: {
      default: "#FAFCFF",
      paper: "#FAFCFF"
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: grey[600], opacity: 1 },
        arrow: { color: grey[600] }
      }
    }
  }
})
