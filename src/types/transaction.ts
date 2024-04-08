import { Tag } from "./tag"

export interface Transaction {
  id: number
  value: string
  date: Date
  type: "Entrada" | "Saída"
  tag: Tag
}

export interface TransactionModal {
  isOpen: boolean
  dataInitialState: Transaction
}
