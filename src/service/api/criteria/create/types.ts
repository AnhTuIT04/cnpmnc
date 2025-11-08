export interface CreateCriteriaRequest {
  name: string;
  description: string;
  weight: number;
  category: "HARDSKILL" | "SOFTSKILL";
}

export interface CreateCriteriaResponse {
  message: string;
  status: number;
  data: {
    id: number;
    name: string;
    description: string;
    weight: number;
    category: "HARDSKILL" | "SOFTSKILL";
  };
}

