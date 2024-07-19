import { SyntheticEvent, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  useTheme
} from "@mui/material"
import {
  BarChartRounded,
  HomeRounded,
  AddCircleRounded
} from "@mui/icons-material"

import { TransactionModal } from "./TransactionModal"
import { openModal, useAppDispatch } from "../redux"

export function Nav() {
  const theme = useTheme()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const location = useLocation().pathname
  const initialState = location === "/" ? "home" : location.split("/")[1]
  const [value, setValue] = useState(initialState)

  const toggleModalOpen = () => dispatch(openModal())

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)

    navigate(newValue === "home" ? "/" : "/" + newValue)
  }

  return (
    <Container maxWidth="lg" sx={{ height: "100%", p: "16px !important" }}>
      <Outlet />

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: "1168px",
          margin: "auto",
          borderTop: ` 1px solid ${theme.palette.grey[400]}`,
          marginBottom: "-10px",
          paddingBottom: "10px",
          bgcolor: "transparent",
          zIndex: 100
        }}
        elevation={3}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Home"
            value={"home"}
            icon={<HomeRounded />}
          />

          <BottomNavigationAction
            value={value}
            onClick={toggleModalOpen}
            icon={<AddCircleRounded fontSize="large" color="success" />}
          />

          <BottomNavigationAction
            disabled
            label="Analytic"
            value={"analytic"}
            icon={<BarChartRounded color="disabled" />}
          />
        </BottomNavigation>
      </Paper>

      <TransactionModal />
    </Container>
  )
}
