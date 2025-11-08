export interface Criteria {
  criteriaId: number;
  name: string;
  description: string;
  weight: number;
  category: "HARDSKILL" | "SOFTSKILL" | string;
}

// API Response structure
export interface CriteriaApiItem {
  id: number;
  name: string;
  description: string;
  weight: number;
  category: "HARDSKILL" | "SOFTSKILL" | string;
}

export interface CriteriaPaginationData {
  content: CriteriaApiItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
}

export interface SearchCriteriaResponse {
  message: string;
  status: number;
  data: CriteriaPaginationData;
}

export interface CriteriaListResult {
  data: Criteria[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
}
