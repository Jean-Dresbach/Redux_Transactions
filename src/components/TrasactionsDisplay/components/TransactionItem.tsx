import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material"
import { Transaction } from "../../../types/transaction"
import { MenuOpen, CloseRounded } from "@mui/icons-material"
import { useState } from "react"
import { EditAndDelete } from "./EditAndDelete"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"

interface TransactionItemProps {
  transaction: Transaction
  haveDivider: boolean
}

export function TransactionItem({
  transaction,
  haveDivider
}: TransactionItemProps) {
  const theme = useTheme()
  const [menuState, setMenuState] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const handleMenuOpen = () => {
    setMenuState((prevState) => !prevState)
  }

  const handleConfirmDeleteOpen = () => {
    setConfirmDeleteOpen(true)
    handleMenuOpen()
  }
  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false)
  }

  const formatDate = (date: Date) => {
    const formatedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(date)

    return formatedDate
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
        key={transaction.id}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography fontSize={30} width={45}>
            {transaction.tag.emoji}
          </Typography>
          <Box>
            <Typography variant="subtitle2" fontWeight={900}>
              {transaction.tag.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {formatDate(new Date(transaction.date))}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography
            sx={{
              bgcolor: theme.palette.background.paper + "!important",
              color:
                transaction.type === "Entrada"
                  ? theme.palette.success.main
                  : theme.palette.error.main
            }}
          >
            R$ {transaction.type === "Entrada" ? "+" : "-"}
            {transaction.value}
          </Typography>

          <Divider orientation="vertical" flexItem />

          <Tooltip
            open={menuState}
            title={
              <EditAndDelete
                handleMenuOpen={handleMenuOpen}
                transaction={transaction}
                openConfirmDelete={handleConfirmDeleteOpen}
              />
            }
            placement="left"
            arrow
            sx={{ zIndex: 99 }}
          >
            <IconButton onClick={handleMenuOpen}>
              {menuState ? <CloseRounded /> : <MenuOpen />}
            </IconButton>
          </Tooltip>
        </Box>

        {haveDivider && <Divider sx={{ width: "100%", my: 2 }} />}
      </Box>

      <ConfirmDeleteModal
        transaction={transaction}
        confirmDeleteOpen={confirmDeleteOpen}
        handleConfirmDeleteClose={handleConfirmDeleteClose}
      />
    </>
  )
}
