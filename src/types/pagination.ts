type Pages = "home" | "analytic"
export type PerPage = 5 | 10 | 20 | 50

export interface Pagination {
  home: {
    currentPage: number
    transactionsPerPage: PerPage
  }
  analytic: {
    currentPage: number
    transactionsPerPage: PerPage
  }
}

export interface ChangePageDTO {
  pageName: Pages
  pageNumber: number
}

export interface ChangePerPageDTO {
  pageName: Pages
  perPageNumber: PerPage
}
