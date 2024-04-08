import { useEffect, useState } from "react"
import {
  ExpandLess,
  ExpandMore,
  KeyboardArrowRightRounded
} from "@mui/icons-material"
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader
} from "@mui/material"
import { grey } from "@mui/material/colors"
import { useAppSelector } from "../../../redux"

const monthsInPortuguese = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]

interface MonthsInTransaction {
  month: string
  year: number
}

export function MonthAnalytic() {
  const transactions = useAppSelector((state) => state.transactions)
  const [open, setOpen] = useState(false)
  const [primaryMonth, setPrimaryMonth] = useState(0)
  const [monthsInTransaction, setMonthsInTransaction] = useState<
    MonthsInTransaction[]
  >([])

  useEffect(() => {
    const getUniqueMonths = () => {
      const uniqueMonths: MonthsInTransaction[] = []

      transactions.forEach((transaction) => {
        const monthYear: MonthsInTransaction = {
          month: monthsInPortuguese[new Date(transaction.date).getMonth()],
          year: new Date(transaction.date).getFullYear()
        }

        const isMonthPresent = uniqueMonths.some(
          (item) =>
            item.month === monthYear.month && item.year === monthYear.year
        )

        if (!isMonthPresent) {
          uniqueMonths.push(monthYear)
        }
      })

      uniqueMonths.sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year
        } else {
          return (
            monthsInPortuguese.indexOf(b.month) -
            monthsInPortuguese.indexOf(a.month)
          )
        }
      })

      setMonthsInTransaction(uniqueMonths)
    }

    getUniqueMonths()
  }, [transactions])

  console.log(monthsInTransaction)

  const handleOpenAccordion = () => {
    setOpen(!open)
  }

  const handleChangePrimaryMonth = (index: number) => {
    setPrimaryMonth(index)
    handleOpenAccordion()
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box mb={1}>
          <List
            component={"div"}
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                sx={{ lineHeight: "20px", paddingTop: "32px" }}
                id="nested-list-subheader"
              >
                Periodo
              </ListSubheader>
            }
          >
            <ListItemButton
              sx={{ borderBottom: `1px solid ${grey[500]}` }}
              onClick={handleOpenAccordion}
            >
              <ListItemText
                primary={
                  monthsInTransaction.length > 0
                    ? `${monthsInTransaction[primaryMonth].month} ${monthsInTransaction[primaryMonth].year}`
                    : ""
                }
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List
                component="div"
                className="monthList"
                sx={{ height: "100%", maxHeight: "120px", overflow: "auto" }}
                disablePadding
              >
                {monthsInTransaction.map((m, index) => (
                  <ListItemButton
                    key={m.month + m.year}
                    sx={{ pl: 4 }}
                    onClick={() => handleChangePrimaryMonth(index)}
                  >
                    <ListItemText primary={m.month + m.year} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>

        <Button
          variant="text"
          color="inherit"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 0,
            padding: "8px 16px"
          }}
        >
          Quanto entrou
          <Box
            component={"span"}
            gap={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            R$ 200,00
            <KeyboardArrowRightRounded />
          </Box>
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 0,
            padding: "8px 16px"
          }}
        >
          Quanto saiu
          <Box
            component={"span"}
            gap={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            R$ 200,00
            <KeyboardArrowRightRounded />
          </Box>
        </Button>
      </Box>
    </>
  )
}
