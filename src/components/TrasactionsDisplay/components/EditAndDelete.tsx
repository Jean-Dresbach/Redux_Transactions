import { Box, Button } from "@mui/material"
import { DeleteRounded, EditRounded } from "@mui/icons-material"
import { grey } from "@mui/material/colors"

import { useAppDispatch, openModal } from "../../../redux"
import { Transaction } from "../../../types/transaction"

interface EditAndDeleteProps {
  transaction: Transaction
  openConfirmDelete: () => void
  handleMenuOpen: () => void
}

export function EditAndDelete({
  openConfirmDelete,
  transaction,
  handleMenuOpen
}: EditAndDeleteProps) {
  const dispatch = useAppDispatch()

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Button
          startIcon={<EditRounded color="success" />}
          color="inherit"
          sx={{
            px: 2,
            "&:hover": {
              background: grey[800]
            }
          }}
          onClick={() => {
            handleMenuOpen()
            dispatch(openModal(transaction))
          }}
        >
          Editar
        </Button>
        <Button
          startIcon={<DeleteRounded color="error" />}
          color="inherit"
          sx={{
            px: 2,
            "&:hover": {
              background: grey[800]
            }
          }}
          onClick={openConfirmDelete}
        >
          Excluir
        </Button>
      </Box>
    </>
  )
}
