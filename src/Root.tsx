import { CssBaseline, ThemeProvider } from "@mui/material"

import { Router } from "./routes/Router"
import { dark, light, useAppSelector } from "./redux"

export function Root() {
  const currentTheme = useAppSelector((state) =>
    state.theme === "light" ? light : dark
  )

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}
