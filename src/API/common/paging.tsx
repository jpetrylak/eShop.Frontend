export interface IPaging {
  currentPage: number;
  resultsPerPage: number;
  orderBy?: string;
  sortOrder?: string;
  pageSizes: number[];
}

export interface IPagingWithPageSizes extends IPaging {
  pageSizes: number[];
}

export interface IPagedResult<T extends Record<string, any>> {
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  items: T[];
  isEmpty: boolean;
  isNotEmpty: boolean;
}
