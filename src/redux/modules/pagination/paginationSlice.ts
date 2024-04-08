import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  ChangePageDTO,
  ChangePerPageDTO,
  Pagination
} from "../../../types/pagination"

const initialState: Pagination = {
  home: {
    currentPage: 1,
    transactionsPerPage: 5
  },
  analytic: {
    currentPage: 1,
    transactionsPerPage: 5
  }
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<ChangePageDTO>) => {
      const { pageName, pageNumber } = action.payload

      return {
        ...state,
        [pageName]: { ...state[pageName], currentPage: pageNumber }
      }
    },
    changeTransactionsPerPage: (
      state,
      action: PayloadAction<ChangePerPageDTO>
    ) => {
      const { pageName, perPageNumber } = action.payload

      return {
        ...state,
        [pageName]: { ...state[pageName], transactionsPerPage: perPageNumber }
      }
    }
  }
})

export const { changePage, changeTransactionsPerPage } = paginationSlice.actions
export default paginationSlice.reducer
