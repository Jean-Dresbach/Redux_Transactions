import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { TagsInitialState, addTagDTO, deleteTagDTO } from "../../../types/tag"

const initialState: TagsInitialState = {
  entrys: [
    { name: "aluguel recebido", emoji: "🏠" },
    { name: "presente recebido", emoji: "🎁" },
    { name: "salário", emoji: "💰" },
    { name: "Freelancer", emoji: "🎨" },
    { name: "Investimentos", emoji: "📈" },
    { name: "Empréstimos", emoji: "🏦" }
  ],
  outs: [
    { name: "aluguel pago", emoji: "🏠" },
    { name: "saúde", emoji: "💊" },
    { name: "comida", emoji: "🍕" },
    { name: "roupas", emoji: "👕" },
    { name: "presente pago", emoji: "🎁" },
    { name: "educação", emoji: "📚" },
    { name: "férias", emoji: "✈️" },
    { name: "gasolina", emoji: "⛽" }
  ]
}

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<addTagDTO>) => {
      if (action.payload.transactionType === "Entrada") {
        return {
          ...state,
          entrys: [...state.entrys, action.payload.tag]
        }
      } else {
        return {
          ...state,
          outs: [...state.outs, action.payload.tag]
        }
      }
    },
    deleteTag: (state, action: PayloadAction<deleteTagDTO>) => {
      const tagNamesToDelete = action.payload.namesToDelete

      if (action.payload.transactionType === "Entrada") {
        return {
          ...state,
          entrys: state.entrys.filter(
            (tag) => !tagNamesToDelete.includes(tag.name)
          )
        }
      } else {
        return {
          ...state,
          outs: state.outs.filter((tag) => !tagNamesToDelete.includes(tag.name))
        }
      }
    }
  }
})

export const { addTag, deleteTag } = tagsSlice.actions
export default tagsSlice.reducer
