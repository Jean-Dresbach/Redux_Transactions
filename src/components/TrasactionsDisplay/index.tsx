import { Box, Divider } from "@mui/material"
import { Pagination } from "./components/Pagination"
import { SelectTransactionWay } from "./components/SelectTransactionWay"
import { useAppSelector } from "../../redux"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { TransactionItem } from "./components/TransactionItem"

export function TrasactionsDisplay() {
  const pathName = useLocation().pathname
  const pageName = pathName === "/" ? "home" : "analytic"
  const transactions = useAppSelector((state) => state.transactions)
  const { currentPage, transactionsPerPage } = useAppSelector(
    (state) => state.pagination[pageName]
  )

  const [transactionWay, setTrasactionWay] = useState({
    entry: true,
    out: true
  })

  const initialPositionPage = transactionsPerPage * (currentPage - 1)

  const handleTransactionView = () => {
    if (!transactionWay.entry) {
      return [...transactions.filter((t) => t.type !== "Entrada")].reverse()
    } else if (!transactionWay.out) {
      return [...transactions.filter((t) => t.type !== "Saída")].reverse()
    } else {
      return [...transactions].reverse()
    }
  }

  return (
    <>
      <SelectTransactionWay
        setTrasactionWay={setTrasactionWay}
        transactionWay={transactionWay}
      />
      <Divider sx={{ my: 1 }} />
      <Pagination handleTransactionView={handleTransactionView} />
      <Box pb={10}>
        {handleTransactionView()
          .slice(initialPositionPage, initialPositionPage + transactionsPerPage)
          .map((t, index, array) => {
            return (
              <TransactionItem
                key={t.id}
                transaction={t}
                haveDivider={index !== array.length - 1}
              />
            )
          })}
      </Box>
    </>
  )
}
