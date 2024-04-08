import { CurrencyExchangeRounded } from "@mui/icons-material"

import { Header, TrasactionsDisplay } from "../../components"
import { BalanceInfo } from "./components/Balance"

export function Home() {
  return (
    <>
      <Header
        text="Transações"
        icon={<CurrencyExchangeRounded fontSize="large" />}
      />
      <BalanceInfo />
      <TrasactionsDisplay />
    </>
  )
}
