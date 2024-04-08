import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import {
  useAppDispatch,
  useAppSelector,
  closeModal,
  updateTransaction,
  addTransaction
} from "../redux"
import { SelectChangeEvent } from "@mui/material"

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez"
]

export function useTransactionModal() {
  const dispatch = useAppDispatch()
  const { isOpen, dataInitialState } = useAppSelector(
    (state) => state.transactionModal
  )
  const [data, setData] = useState(dataInitialState)
  const [openTagModal, setOpenTagModal] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (data.value !== "" && data.tag.name !== "") {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [data])

  useEffect(() => {
    setData(dataInitialState)
  }, [dataInitialState])

  const isUpdate = dataInitialState.id !== 0

  const processInputValue = (name: string, value: string) => {
    let processedValue = value
    processedValue = value.replace(/[^0-9.]+/, "")

    const firstPointIndex = processedValue.indexOf(".")

    processedValue =
      processedValue.slice(0, firstPointIndex + 1) +
      processedValue.slice(firstPointIndex + 1).replace(/\./g, "")

    return setData((prevState) => ({
      ...prevState,
      [name]: processedValue
    }))
  }

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const moth = months[date.getMonth()]
    const year = date.getFullYear()

    const hour = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `Hoje às ${hour}:${minutes} - ${day} / ${moth} / ${year}`
  }

  const handleCloseTrasactionModal = () => {
    dispatch(closeModal())
  }

  const toggleTagModalOpen = () => setOpenTagModal((prev) => !prev)

  const handleChange = (
    e:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<"Entrada" | "Saída">
  ) => {
    const { name, value } = e.target

    if (name === "value") {
      return processInputValue(name, value)
    }

    if (name === "type") {
      setData((prevState) => ({ ...prevState, tag: { name: "", emoji: "" } }))
    }

    setData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataModal = { ...data, value: Number(data.value).toFixed(2) }

    if (isUpdate) {
      dispatch(updateTransaction(dataModal))
    } else {
      dispatch(addTransaction(dataModal))
    }

    dispatch(closeModal())
  }

  return {
    handleCloseTrasactionModal,
    handleChange,
    handleSubmit,
    toggleTagModalOpen,
    formatDate,
    data,
    setData,
    disabled,
    openTagModal,
    isOpen,
    isUpdate
  }
}
