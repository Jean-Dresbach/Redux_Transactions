import { Dispatch } from "react"
import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import { useAppSelector } from "../../../../../redux"
import { Transaction } from "../../../../../types/transaction"

interface SelectContentProps {
  type: "Entrada" | "Saída"
  toggleModalOpen: () => void
  setData: Dispatch<React.SetStateAction<Transaction>>
}

export function SelectContent({
  type,
  setData,
  toggleModalOpen
}: SelectContentProps) {
  const theme = useTheme()
  const tags = useAppSelector((state) => state.tags)

  return (
    <Box sx={{ height: "100%" }}>
      <Grid
        container
        spacing={1}
        sx={{
          maxHeight: "100%",
          overflow: "auto"
        }}
      >
        {tags[type === "Entrada" ? "entrys" : "outs"].map((t) => (
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={6}
            sm={4}
            key={t.name}
          >
            <Button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "120px"
              }}
              onClick={() => {
                setData((prevState) => ({
                  ...prevState,
                  tag: { name: t.name, emoji: t.emoji }
                }))
                toggleModalOpen()
              }}
              key={t.name}
            >
              <Typography
                variant="subtitle1"
                component="span"
                color="ButtonText"
                sx={{ fontSize: "30px" }}
              >
                {t.emoji}
              </Typography>
              <Typography
                variant="subtitle1"
                component="span"
                sx={{
                  color: theme.palette.text.primary,
                  wordBreak: "break-word"
                }}
              >
                {t.name}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
