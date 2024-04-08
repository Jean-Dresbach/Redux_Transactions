import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select
} from "@mui/material"
import { usePagination } from "../../../hooks/usePagination"
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material"
import { useLocation } from "react-router-dom"
import { Transaction } from "../../../types/transaction"

interface PaginationProps {
  handleTransactionView: () => Transaction[]
}

export function Pagination({ handleTransactionView }: PaginationProps) {
  const pathName = useLocation().pathname

  const {
    currentPage,
    transactionsPerPage,
    pages,
    nextDisabled,
    prevDisabled,
    handlePrevNextClick,
    handleSelectPageChange,
    handleSelectPerPageChange
  } = usePagination(pathName, handleTransactionView())

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 5 }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <FormControl>
          <Select
            sx={{ padding: 1, maxHeight: "150px" }}
            value={currentPage.toString()}
            onChange={handleSelectPageChange}
            className="pagination"
            MenuProps={{ PaperProps: { sx: { ...{ maxHeight: 150 } } } }}
          >
            {pages.map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            sx={{ textAlign: "center", fontSize: "10px", m: 0, mt: 1 }}
          >
            Escolha a página
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Select
            sx={{ padding: 1 }}
            value={transactionsPerPage.toString()}
            onChange={handleSelectPerPageChange}
            className="pagination"
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </Select>
          <FormHelperText
            sx={{ textAlign: "center", fontSize: "10px", m: 0, mt: 1 }}
          >
            Transações por página
          </FormHelperText>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: "80px" }}>
        <IconButton
          disabled={prevDisabled}
          onClick={() => handlePrevNextClick("prev")}
        >
          <ArrowBackRounded />
        </IconButton>
        <IconButton
          disabled={nextDisabled}
          onClick={() => handlePrevNextClick("next")}
        >
          <ArrowForwardRounded />
        </IconButton>
      </Box>
    </Box>
  )
}
