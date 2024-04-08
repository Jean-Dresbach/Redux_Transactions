import { Box, Button, Divider, Modal, Typography } from "@mui/material"
import { Transaction } from "../../../types/transaction"
import { useAppDispatch, deleteTransaction } from "../../../redux"

interface ConfirmDeleteModalProps {
  confirmDeleteOpen: boolean
  handleConfirmDeleteClose: () => void
  transaction: Transaction
}

const style = {
  position: "absolute" as const,
  inset: 0,
  width: "90%",
  height: "min-content",
  maxWidth: "400px",
  margin: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  animation: "bounce .3s",
  zIndex: 99999
}

export function ConfirmDeleteModal({
  transaction,
  confirmDeleteOpen,
  handleConfirmDeleteClose
}: ConfirmDeleteModalProps) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction))
    handleConfirmDeleteClose()
  }
  return (
    <Modal open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
      <Box sx={style}>
        <Typography variant="h5">
          Deseja mesmo excluir esta transação?
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Excluir
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleConfirmDeleteClose}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
