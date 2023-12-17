export interface IPagingData {
  currentPage: number;
  resultsPerPage: number;
  orderBy?: string;
  sortOrder?: string;
  pageSizes: number[];
}

export type PagedResult<T extends Record<string, any>> = {
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  items: T[];
  isEmpty: boolean;
  isNotEmpty: boolean;
};
