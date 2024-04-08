import { useState } from "react"
import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import {
  RadioButtonUncheckedRounded,
  CheckCircleRounded
} from "@mui/icons-material"
import { useAppDispatch, useAppSelector, deleteTag } from "../../../../../redux"
import { deleteTagDTO } from "../../../../../types/tag"

interface DeleteContentProps {
  type: "Entrada" | "Saída"
}

export function DeleteContent({ type }: DeleteContentProps) {
  const [deleteTagState, setDeleteTagState] = useState<deleteTagDTO>({
    transactionType: type,
    namesToDelete: []
  })
  const theme = useTheme()
  const tags = useAppSelector((state) => state.tags)
  const dispatch = useAppDispatch()

  const handleAddNameToNamesToDelete = (name: string) => {
    setDeleteTagState((prevState) => ({
      ...prevState,
      namesToDelete: [...prevState.namesToDelete, name]
    }))
  }

  const handleDeleteNameToNamesToDelete = (name: string) => {
    setDeleteTagState((prevState) => ({
      ...prevState,
      namesToDelete: prevState.namesToDelete.filter((n) => n !== name)
    }))
  }

  const handleDelete = () => {
    dispatch(deleteTag(deleteTagState))
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        gap: 2,
        pb: 1
      }}
    >
      <Box sx={{ width: "100%", maxHeight: "100%", overflow: "auto" }}>
        <Grid container spacing={1}>
          {tags[type === "Entrada" ? "entrys" : "outs"].map((t) => (
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "min-content"
              }}
              xs={6}
              sm={4}
              key={t.name}
            >
              <Button
                sx={{
                  width: "100%",
                  height: "120px",
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                onClick={() => {
                  !deleteTagState.namesToDelete.includes(t.name)
                    ? handleAddNameToNamesToDelete(t.name)
                    : handleDeleteNameToNamesToDelete(t.name)
                }}
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
                {deleteTagState.namesToDelete.includes(t.name) ? (
                  <CheckCircleRounded
                    color="error"
                    sx={{ position: "absolute", top: 5, right: 5 }}
                  />
                ) : (
                  <RadioButtonUncheckedRounded
                    color="error"
                    sx={{ position: "absolute", top: 5, right: 5 }}
                  />
                )}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%", maxWidth: "250px", marginTop: "auto" }}
        disabled={deleteTagState.namesToDelete.length === 0 ? true : false}
        onClick={handleDelete}
      >
        Confirmar
      </Button>
    </Box>
  )
}
