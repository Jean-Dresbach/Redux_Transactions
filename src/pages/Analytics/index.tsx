import { CalendarMonthRounded } from "@mui/icons-material"

import { Header } from "../../components"
import { MonthAnalytic } from "./components/MonthAnalytic"

export function Analytic() {
  return (
    <>
      <Header
        text="Análise do mês"
        icon={<CalendarMonthRounded fontSize="large" />}
      />
      <MonthAnalytic />
    </>
  )
}
