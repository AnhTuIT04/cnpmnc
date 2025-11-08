import apiClient from "@/lib/axios";
import type { CreateCriteriaRequest, CreateCriteriaResponse } from "./types";

const URL_BASE = "/criteria";

export function createCriteria(data: CreateCriteriaRequest): Promise<CreateCriteriaResponse> {
  const http = apiClient;

  const res = http.post<CreateCriteriaResponse>(URL_BASE, data);

  return res.then((res) => res.data);
}

