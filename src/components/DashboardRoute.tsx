import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthContext";
import Dashboard from "@/pages/Dashboard/dashboard";

// Component to protect dashboard route from SUPERVISOR
export const DashboardRoute = () => {
  const { user } = useAuth();
  
  if (user?.role === "SUPERVISOR") {
    return <Navigate to="/employee" replace />;
  }
  
  return <Dashboard />;
};

