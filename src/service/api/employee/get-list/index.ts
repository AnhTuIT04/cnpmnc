import apiClient from "@/lib/axios";
import type { EmployeeListResponse, EmployeeListParams } from "./types";

const URL_BASE = "/supervisor/employee";

export function getEmployeeList(params: EmployeeListParams): Promise<EmployeeListResponse> {
  const http = apiClient;
  const res = http.get<{ data: EmployeeListResponse; message: string; status: number }>(URL_BASE, {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
    },
  });

  return res.then((res) => res.data.data);
}

