import apiClient from "@/lib/axios";
import type { AssessmentResponse } from "./types";
import { mockAssessmentData } from "@/lib/mockAssessmentData";

const URL_BASE = "/assessments/supervisor";

export async function getSupervisorAssessments(): Promise<AssessmentResponse> {
  try {
    const response = await apiClient.get<AssessmentResponse>(URL_BASE);

    // Check if response is valid
    if (!response.data || typeof response.data !== "object") {
      console.warn("API returned invalid response, using mock data");
      return mockAssessmentData;
    }

    // Check if response has expected structure
    const data = response.data;
    if (data && "data" in data && Array.isArray(data.data)) {
      return data;
    }

    // If response structure is invalid, use mock data
    console.warn("API returned invalid response structure, using mock data");
    return mockAssessmentData;
  } catch (error) {
    // Fallback to mock data if API fails
    console.warn("API call failed, using mock data:", error);
    return mockAssessmentData;
  }
}
