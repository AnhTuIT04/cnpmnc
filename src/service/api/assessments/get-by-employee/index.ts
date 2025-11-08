import apiClient from "@/lib/axios";
import type { AssessmentResponse } from "../get-supervisor/types";

const URL_BASE = "/assessments/supervisor";

export async function getAssessmentsByEmployee(employeeId: number): Promise<AssessmentResponse> {
  try {
    const response = await apiClient.get<AssessmentResponse>(URL_BASE, {
      params: {
        employeeId: employeeId,
      },
    });

    // Check if response is valid
    if (!response.data || typeof response.data !== "object") {
      console.warn("API returned invalid response, using mock data");
      return {
        message: "Success",
        status: 200,
        data: [],
      };
    }

    // Check if response has expected structure
    const data = response.data;
    if (data && "data" in data && Array.isArray(data.data)) {
      return data;
    }

    // If response structure is invalid, use empty data
    console.warn("API returned invalid response structure");
    return {
      message: "Success",
      status: 200,
      data: [],
    };
  } catch (error) {
    // Return empty data if API fails
    console.warn("API call failed:", error);
    return {
      message: "Success",
      status: 200,
      data: [],
    };
  }
}

