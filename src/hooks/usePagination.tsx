import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import {
  useAppDispatch,
  useAppSelector,
  changePage,
  changeTransactionsPerPage
} from "../redux"
import { PerPage } from "../types/pagination"
import { Transaction } from "../types/transaction"

export function usePagination(pathName: string, transactions: Transaction[]) {
  const pageName = pathName === "/" ? "home" : "analytic"

  const { currentPage, transactionsPerPage } = useAppSelector(
    (state) => state.pagination[pageName]
  )
  const dispatch = useAppDispatch()

  const [pages, setPages] = useState<number[]>(
    Array.from({
      length: Math.ceil(transactions.length / transactionsPerPage)
    })
  )

  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)

  useEffect(() => {
    setPages(
      Array.from({
        length: Math.ceil(transactions.length / transactionsPerPage)
      })
    )
  }, [transactionsPerPage, transactions])

  useEffect(() => {
    currentPage === 1 ? setPrevDisabled(true) : setPrevDisabled(false)

    currentPage === pages.length
      ? setNextDisabled(true)
      : setNextDisabled(false)
  }, [currentPage, pages])

  const handlePrevNextClick = (name: "prev" | "next") => {
    name === "prev"
      ? dispatch(changePage({ pageName, pageNumber: currentPage - 1 }))
      : dispatch(changePage({ pageName, pageNumber: currentPage + 1 }))
  }

  const handleSelectPageChange = (e: SelectChangeEvent) => {
    const value = e.target.value

    dispatch(changePage({ pageName, pageNumber: Number(value) }))
  }

  const handleSelectPerPageChange = (e: SelectChangeEvent) => {
    const value = Number(e.target.value) as PerPage

    dispatch(
      changeTransactionsPerPage({
        pageName,
        perPageNumber: value
      })
    )

    dispatch(changePage({ pageName, pageNumber: 1 }))
  }

  return {
    currentPage,
    transactionsPerPage,
    pages,
    prevDisabled,
    nextDisabled,
    handlePrevNextClick,
    handleSelectPageChange,
    handleSelectPerPageChange
  }
}
