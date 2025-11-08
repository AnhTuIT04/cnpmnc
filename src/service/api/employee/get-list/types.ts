export interface Employee {
  id: number;
  name: string;
  email: string;
}

export interface EmployeeListData {
  pageNumber: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  totalPages: number;
  content: Employee[];
  first: boolean;
  totalElements: number;
}

export interface EmployeeListResponse {
  pageNumber: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  totalPages: number;
  content: Employee[];
  first: boolean;
  totalElements: number;
}

export interface EmployeeListParams {
  page?: number; // Page starts from 0
  size?: number;
}

