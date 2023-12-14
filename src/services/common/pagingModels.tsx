export interface PagingData {
  page: number;
  results: number;
  orderBy?: string;
  sortOrder?: string;
}

export type PagedResult<T> = null | {
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  items: T[];
  isEmpty: boolean;
  isNotEmpty: boolean;
};
