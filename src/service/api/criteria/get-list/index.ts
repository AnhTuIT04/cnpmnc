import type { SearchCriteriaParams } from "@/components/criteria/types";
import apiClient from "@/lib/axios";
import type { SearchCriteriaResponse, CriteriaListResult } from "./types";

const URL_BASE = "/criteria";

export function getCriteriaList(params: SearchCriteriaParams): Promise<CriteriaListResult> {
  const http = apiClient;
  // Chỉ gửi các params có giá trị
  const queryParams: Record<string, string | number> = {};
  // API page starts from 0, convert from 1-based to 0-based
  if (params.page) {
    queryParams.page = params.page - 1;
  }
  if (params.limit) {
    queryParams.limit = params.limit;
  }
  if (params.searchText && params.searchText.trim() !== "") {
    queryParams.searchText = params.searchText.trim();
  }

  const res = http.get<SearchCriteriaResponse>(URL_BASE, { params: queryParams });

  return res.then((res) => {
    // Map API response to Criteria format (id -> criteriaId)
    const criteria = res.data.data.content.map((item) => ({
      criteriaId: item.id,
      name: item.name,
      description: item.description,
      weight: item.weight,
      category: item.category,
    }));

    return {
      data: criteria,
      totalPages: res.data.data.totalPages,
      totalElements: res.data.data.totalElements,
      currentPage: res.data.data.number + 1, // Convert 0-based to 1-based
      size: res.data.data.size,
    };
  });
}
