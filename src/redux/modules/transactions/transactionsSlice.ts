import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Transaction } from "../../../types/transaction"

const initialState: Transaction[] = [
  // Transações para Novembro de 2023
  {
    id: 1635931200001,
    value: "450.00",
    date: new Date(2023, 10, 5, 12, 37),
    type: "Entrada",
    tag: { name: "aluguel recebido", emoji: "🏠" }
  },
  {
    id: 1636326600002,
    value: "120.00",
    date: new Date(2023, 10, 11, 15, 45),
    type: "Entrada",
    tag: { name: "salário", emoji: "💰" }
  },
  {
    id: 1636722000003,
    value: "30.00",
    date: new Date(2023, 10, 15, 17, 59),
    type: "Saída",
    tag: { name: "comida", emoji: "🍕" }
  },
  {
    id: 1637117400004,
    value: "60.00",
    date: new Date(2023, 10, 20, 9, 30),
    type: "Saída",
    tag: { name: "saúde", emoji: "💊" }
  },
  {
    id: 1637512800005,
    value: "150.00",
    date: new Date(2023, 10, 25, 13, 35),
    type: "Entrada",
    tag: { name: "Freelancer", emoji: "🎨" }
  },
  {
    id: 1637703600006,
    value: "200.00",
    date: new Date(2023, 10, 28, 15, 53),
    type: "Saída",
    tag: { name: "presente pago", emoji: "🎁" }
  },
  {
    id: 1637886000007,
    value: "80.00",
    date: new Date(2023, 10, 30, 16, 42),
    type: "Entrada",
    tag: { name: "aluguel recebido", emoji: "🏠" }
  },

  // Transações para Dezembro de 2023
  {
    id: 1638208800008,
    value: "500.00",
    date: new Date(2023, 11, 3, 18, 28),
    type: "Entrada",
    tag: { name: "salário", emoji: "💰" }
  },
  {
    id: 1638597600009,
    value: "40.00",
    date: new Date(2023, 11, 8, 22, 30),
    type: "Saída",
    tag: { name: "roupas", emoji: "👕" }
  },
  {
    id: 1638993000010,
    value: "80.00",
    date: new Date(2023, 11, 13, 23, 2),
    type: "Saída",
    tag: { name: "férias", emoji: "✈️" }
  },
  {
    id: 1639388400011,
    value: "200.00",
    date: new Date(2023, 11, 18, 21, 10),
    type: "Entrada",
    tag: { name: "Investimentos", emoji: "📈" }
  },
  {
    id: 1639783800012,
    value: "60.00",
    date: new Date(2023, 11, 22, 5, 46),
    type: "Saída",
    tag: { name: "comida", emoji: "🍕" }
  },
  {
    id: 1640179200013,
    value: "70.00",
    date: new Date(2023, 11, 27, 13, 27),
    type: "Saída",
    tag: { name: "saúde", emoji: "💊" }
  },
  {
    id: 1640460000014,
    value: "120.00",
    date: new Date(2023, 11, 31, 8, 34),
    type: "Entrada",
    tag: { name: "Freelancer", emoji: "🎨" }
  },

  // Transações para Janeiro de 2024
  {
    id: 1640805600015,
    value: "150.00",
    date: new Date(2024, 0, 5, 13, 49),
    type: "Entrada",
    tag: { name: "aluguel recebido", emoji: "🏠" }
  },
  {
    id: 1641201000016,
    value: "80.00",
    date: new Date(2024, 0, 10, 22, 46),
    type: "Saída",
    tag: { name: "comida", emoji: "🍕" }
  },
  {
    id: 1641596400017,
    value: "200.00",
    date: new Date(2024, 0, 15, 19, 56),
    type: "Entrada",
    tag: { name: "salário", emoji: "💰" }
  },
  {
    id: 1641991800018,
    value: "40.00",
    date: new Date(2024, 0, 20, 16, 34),
    type: "Saída",
    tag: { name: "gasolina", emoji: "⛽" }
  },
  {
    id: 1642387200019,
    value: "90.00",
    date: new Date(2024, 0, 25, 8, 54),
    type: "Saída",
    tag: { name: "saúde", emoji: "💊" }
  },
  {
    id: 1642782600020,
    value: "120.00",
    date: new Date(2024, 0, 30, 10, 32),
    type: "Entrada",
    tag: { name: "Empréstimos", emoji: "🏦" }
  },

  // Transações para Fevereiro de 2024
  {
    id: 1643178000021,
    value: "200.00",
    date: new Date(2024, 1, 3, 14, 58),
    type: "Entrada",
    tag: { name: "salário", emoji: "💰" }
  },
  {
    id: 1643573400022,
    value: "50.00",
    date: new Date(2024, 1, 8, 15),
    type: "Saída",
    tag: { name: "roupas", emoji: "👕" }
  },
  {
    id: 1643968800023,
    value: "80.00",
    date: new Date(2024, 1, 13, 17),
    type: "Saída",
    tag: { name: "férias", emoji: "✈️" }
  },
  {
    id: 1644364200024,
    value: "150.00",
    date: new Date(2024, 1, 18, 16, 9),
    type: "Entrada",
    tag: { name: "Investimentos", emoji: "📈" }
  },
  {
    id: 1644759600025,
    value: "30.00",
    date: new Date(2024, 1, 23, 12, 35),
    type: "Saída",
    tag: { name: "comida", emoji: "🍕" }
  },
  {
    id: 1645155000026,
    value: "70.00",
    date: new Date(2024, 1, 28, 14, 7),
    type: "Saída",
    tag: { name: "saúde", emoji: "💊" }
  },

  // Transações para Março de 2024
  {
    id: 1645543800027,
    value: "180.00",
    date: new Date(2024, 2, 5, 10, 45),
    type: "Entrada",
    tag: { name: "Freelancer", emoji: "🎨" }
  },
  {
    id: 1645939200028,
    value: "90.00",
    date: new Date(2024, 2, 10, 11, 45),
    type: "Saída",
    tag: { name: "gasolina", emoji: "⛽" }
  },
  {
    id: 1646334600029,
    value: "200.00",
    date: new Date(2024, 2, 15, 12, 32),
    type: "Entrada",
    tag: { name: "salário", emoji: "💰" }
  },
  {
    id: 1646730000030,
    value: "50.00",
    date: new Date(2024, 2, 20, 6, 35),
    type: "Saída",
    tag: { name: "roupas", emoji: "👕" }
  },
  {
    id: 1647125400031,
    value: "120.00",
    date: new Date(2024, 2, 25, 14, 32),
    type: "Entrada",
    tag: { name: "Empréstimos", emoji: "🏦" }
  },
  {
    id: 1647420600032,
    value: "70.00",
    date: new Date(2024, 2, 30, 13, 33),
    type: "Saída",
    tag: { name: "saúde", emoji: "💊" }
  },

  // Transações para Abril de 2024
  {
    id: 1647809400033,
    value: "250.00",
    date: new Date(2024, 3, 3, 15, 44),
    type: "Entrada",
    tag: { name: "Investimentos", emoji: "📈" }
  },
  {
    id: 1648204800034,
    value: "60.00",
    date: new Date(2024, 3, 8, 16, 34),
    type: "Saída",
    tag: { name: "comida", emoji: "🍕" }
  },
  {
    id: 1648600200035,
    value: "100.00",
    date: new Date(2024, 3, 13, 12, 45),
    type: "Saída",
    tag: { name: "férias", emoji: "✈️" }
  },
  {
    id: 1648995600036,
    value: "180.00",
    date: new Date(2024, 3, 18, 16, 35),
    type: "Entrada",
    tag: { name: "aluguel recebido", emoji: "🏠" }
  },
  {
    id: 1649391000037,
    value: "116.00",
    date: new Date(2024, 3, 23, 12, 12),
    type: "Saída",
    tag: { name: "saúde", emoji: "💊" }
  },
  {
    id: 1649786400038,
    value: "120.00",
    date: new Date(2024, 3, 28, 13, 59),
    type: "Entrada",
    tag: { name: "Freelancer", emoji: "🎨" }
  }
]

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      return [...state, action.payload]
    },
    deleteTransaction: (state, action: PayloadAction<Transaction>) => {
      return state.filter((t) => t.id !== action.payload.id)
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      return state.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction
      )
    }
  }
})

export const { addTransaction, deleteTransaction, updateTransaction } =
  transactionsSlice.actions
export default transactionsSlice.reducer
