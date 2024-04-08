import { ChangeEvent, Dispatch } from "react"
import { ExpandCircleDown, ExpandCircleDownOutlined } from "@mui/icons-material"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme
} from "@mui/material"

interface SelectTransactionWayProps {
  transactionWay: {
    entry: boolean
    out: boolean
  }
  setTrasactionWay: Dispatch<
    React.SetStateAction<{
      entry: boolean
      out: boolean
    }>
  >
}

export function SelectTransactionWay({
  setTrasactionWay,
  transactionWay
}: SelectTransactionWayProps) {
  const theme = useTheme()

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    const otherKey = name === "entry" ? "out" : "entry"

    setTrasactionWay((prevState) => {
      if (checked) {
        return { ...prevState, [name]: true }
      } else {
        if (!prevState[otherKey]) {
          return { ...prevState, [name]: true }
        } else {
          return { ...prevState, [name]: false }
        }
      }
    })
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Typography variant="h6" mx={1}>
        Histórico
      </Typography>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={transactionWay.entry}
              onChange={handleCheckChange}
              name="entry"
              icon={<ExpandCircleDownOutlined color="success" />}
              checkedIcon={<ExpandCircleDown color="success" />}
            />
          }
          sx={{
            m: 0,
            "& .MuiFormControlLabel-label": {
              textDecoration: transactionWay.entry ? "none" : "line-through",
              color: transactionWay.entry ? "none" : theme.palette.grey[500]
            }
          }}
          label="Entradas"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={transactionWay.out}
              onChange={handleCheckChange}
              name="out"
              icon={
                <ExpandCircleDownOutlined
                  color="error"
                  sx={{ rotate: "180deg" }}
                />
              }
              checkedIcon={
                <ExpandCircleDown color="error" sx={{ rotate: "180deg" }} />
              }
            />
          }
          sx={{
            m: 0,
            "& .MuiFormControlLabel-label": {
              textDecoration: transactionWay.out ? "none" : "line-through",
              color: transactionWay.out ? "none" : theme.palette.grey[500]
            }
          }}
          label="Saidas"
        />
      </Box>
    </Box>
  )
}
