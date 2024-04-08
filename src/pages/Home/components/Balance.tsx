import { Box, Container, Typography, useTheme } from "@mui/material"
import { useAppSelector } from "../../../redux"
import { useEffect, useState } from "react"

export function BalanceInfo() {
  const theme = useTheme()
  const [balance, setBalance] = useState("")
  const transactions = useAppSelector((state) => state.transactions)

  useEffect(() => {
    const balance = transactions.reduce(
      (accumulator, currentValue) =>
        currentValue.type === "Entrada"
          ? accumulator + Number(currentValue.value)
          : accumulator - Number(currentValue.value),
      0
    )

    setBalance(balance.toFixed(2))
  }, [transactions])

  const typographyColor =
    Number(balance) !== 0
      ? Number(balance) > 0
        ? theme.palette.success.main
        : theme.palette.error.main
      : "inherit"

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 10
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Typography
          variant="h2"
          fontSize={25}
          color={theme.palette.text.secondary}
          sx={{ alignSelf: "start" }}
        >
          Saldo
        </Typography>

        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h4" sx={{ color: typographyColor, mr: 1 }}>
            R$ {Number(balance) < 0 ? "-" : Number(balance) > 0 ? "+" : ""}
          </Typography>

          <Typography variant="h2">
            {Number(balance) < 0
              ? balance.split("-")[1].split(".")[0]
              : balance.split(".")[0]}
          </Typography>
          <Typography variant="h3" component={"span"} mt={1}>
            .
          </Typography>
          <Typography variant="h3" alignSelf={"end"} pb={0.4} fontWeight={100}>
            {balance.split(".")[1]}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
