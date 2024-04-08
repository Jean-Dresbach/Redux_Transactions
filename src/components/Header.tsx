import { useAppDispatch, useAppSelector } from "../redux"
import { IconButton, Typography } from "@mui/material"
import { toggleTheme } from "../redux/modules/themes/themeSlice"
import { DarkMode, LightMode } from "@mui/icons-material"
import { Box } from "@mui/system"
import { ReactNode } from "react"

interface HeaderProps {
  text: string
  icon: ReactNode
}

export function Header({ text, icon }: HeaderProps) {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  function handleToggleTheme() {
    dispatch(toggleTheme())
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2
      }}
      component={"header"}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h1" fontSize={30} mr={2}>
          {text}
        </Typography>
        {icon}
      </Box>

      <IconButton
        aria-label="toggle theme"
        onClick={handleToggleTheme}
        sx={{ p: 0 }}
      >
        {theme === "light" ? (
          <LightMode sx={{ fill: "black" }} />
        ) : (
          <DarkMode />
        )}
      </IconButton>
    </Box>
  )
}
