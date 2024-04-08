import { Dispatch, SyntheticEvent, useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  Divider,
  Modal,
  Tab,
  Tabs,
  Typography
} from "@mui/material"
import TagIcon from "@mui/icons-material/SellRounded"

import { Transaction } from "../../../../types/transaction"
import { SelectContent } from "./components/SelectContent"
import { AddContent } from "./components/AddContent"
import { DeleteContent } from "./components/DeleteContent"

interface SelectTagModalProps {
  open: boolean
  toggleModalOpen: () => void
  setData: Dispatch<React.SetStateAction<Transaction>>
  type: "Entrada" | "Saída"
}

const style = {
  position: "absolute" as const,
  inset: 0,
  boxShadow: 24,
  margin: "auto",
  maxHeight: "600px",
  bgcolor: "background.paper",
  padding: "16px !important",
  animation: "bounce .2s"
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 1,
            height: "466.5px"
          }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  }
}

export function TagModal({
  toggleModalOpen,
  setData,
  open,
  type
}: SelectTagModalProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (open === false) {
      setValue(0)
    }
  }, [open])

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleTagView = (id: number, text: string) => {
    const tabStyle = { display: "flex", alignItems: "center", gap: 1 }
    const tagColor = type === "Entrada" ? "success" : "error"

    return (
      <Typography sx={tabStyle}>
        {text}
        {value === id ? (
          <TagIcon color={tagColor} />
        ) : (
          <TagIcon color="inherit" />
        )}
      </Typography>
    )
  }

  return (
    <Modal open={open} onClose={toggleModalOpen} aria-labelledby="title-modal">
      <Container sx={style} maxWidth="sm">
        <Box sx={{ borderBottom: 1, borderColor: "divider", maxWidth: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example"
          >
            <Tab label={handleTagView(0, "Selecionar")} {...a11yProps(0)} />
            <Tab label={handleTagView(1, "Adicionar")} {...a11yProps(1)} />
            <Tab label={handleTagView(2, "Excluir")} {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel
          value={value}
          index={0}
          children={
            <SelectContent
              setData={setData}
              toggleModalOpen={toggleModalOpen}
              type={type}
            />
          }
        />
        <CustomTabPanel
          value={value}
          index={1}
          children={
            <AddContent
              setData={setData}
              toggleModalOpen={toggleModalOpen}
              type={type}
            />
          }
        />
        <CustomTabPanel
          value={value}
          index={2}
          children={<DeleteContent type={type} />}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            flexDirection: "column",
            gap: 2
          }}
        >
          <Divider sx={{ width: "100%" }} />
          <Button variant="outlined" color="primary" onClick={toggleModalOpen}>
            Cancelar
          </Button>
        </Box>
      </Container>
    </Modal>
  )
}
