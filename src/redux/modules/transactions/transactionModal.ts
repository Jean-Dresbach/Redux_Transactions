import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { Transaction, TransactionModal } from "../../../types/transaction"

const initialModalState: TransactionModal = {
  isOpen: false,
  dataInitialState: {
    id: 0,
    date: new Date(),
    value: "",
    type: "Entrada",
    tag: { name: "", emoji: "" }
  }
}

export const transactionModalSlice = createSlice({
  name: "transactionModal",
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<Transaction | undefined>) => {
      if (action?.payload) {
        return { isOpen: true, dataInitialState: action.payload }
      } else {
        return { ...state, isOpen: true }
      }
    },
    closeModal: () => {
      return { ...initialModalState }
    }
  }
})

export const { openModal, closeModal } = transactionModalSlice.actions
export default transactionModalSlice.reducer
