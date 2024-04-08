import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

import tagsReducer from "./modules/tags/tagsSlice"
import transactionsReducer from "./modules/transactions/transactionsSlice"
import transactionModalReducer from "./modules/transactions/transactionModal"
import themeReducer from "./modules/themes/themeSlice"
import paginationReducer from "./modules/pagination/paginationSlice"

const rootReducer = combineReducers({
  tags: tagsReducer,
  transactions: transactionsReducer,
  transactionModal: transactionModalReducer,
  theme: themeReducer,
  pagination: paginationReducer
})

export const persistedReducer = persistReducer(
  {
    key: "transactionsAppStore",
    storage
  },
  rootReducer
)
