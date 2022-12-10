export interface ListResponse<T> {
  items: T[]
  pageItemSize?: number
  currentPage?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  first?: boolean
  last?: boolean
}

export interface FilterParams {
  page?: number
  size?: number
  sort?: string[]
}

export interface Pagination {
  page: number
  size: number
  totalPages: number
  total: number
}

export type LayoutType = 'STUDENT' | 'ADMIN' | 'TEACHER' | 'BLANK'
