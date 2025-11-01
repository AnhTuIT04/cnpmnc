import { useState, useMemo } from "react";
import Sidebar from "@/components/shared/sidebar";
import type { IEmployeeChartData } from "@/components/EmployeeChart";
import EmployeeChart from "@/components/EmployeeChart";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  TextField,
  Stack
} from "@mui/material";

const mockEmployeeChartData: IEmployeeChartData[] = [
  { time: "01-01-2025", value: 65 },
  { time: "02-01-2025", value: 68 },
  { time: "03-01-2025", value: 72 },
  { time: "04-01-2025", value: 70 },
  { time: "05-01-2025", value: 75 },
  { time: "06-01-2025", value: 78 },
  { time: "07-01-2025", value: 80 },
  { time: "08-01-2025", value: 82 },
  { time: "09-01-2025", value: 79 },
  { time: "10-01-2025", value: 85 },
  { time: "11-01-2025", value: 88 },
  { time: "12-01-2025", value: 90 },
  { time: "13-01-2025", value: 87 },
  { time: "14-01-2025", value: 92 },
  { time: "15-01-2025", value: 95 },
  { time: "16-01-2025", value: 93 },
  { time: "17-01-2025", value: 90 },
  { time: "18-01-2025", value: 88 },
  { time: "19-01-2025", value: 85 },
  { time: "20-01-2025", value: 82 },
  { time: "21-01-2025", value: 80 },
  { time: "22-01-2025", value: 78 },
  { time: "23-01-2025", value: 75 },
  { time: "24-01-2025", value: 72 },
  { time: "25-01-2025", value: 70 },
  { time: "26-01-2025", value: 68 },
  { time: "27-01-2025", value: 65 },
  { time: "28-01-2025", value: 70 },
  { time: "29-01-2025", value: 75 },
  { time: "30-01-2025", value: 80 },
  { time: "31-01-2025", value: 85 },
];

export default function Dashboard() {
  const [startDate, setStartDate] = useState<string>("2025-01-01");
  const [endDate, setEndDate] = useState<string>("2025-01-31");

  const filteredData = useMemo(() => {
    return mockEmployeeChartData.filter((item) => {
      const itemDate = item.time.split("-").reverse().join("-");
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [startDate, endDate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1a1a1a' }}>
            Tổng quan
          </Typography>

          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'flex-start', md: 'center' },
                  gap: 2,
                  mb: 4 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Biểu đồ hiệu suất
                  </Typography>
                </Box>
                
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Ngày bắt đầu"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    sx={{ 
                      minWidth: 180,
                    }}
                  />
                  
                  <TextField
                    label="Ngày kết thúc"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    sx={{ 
                      minWidth: 180,
                    }}
                  />
                </Stack>
              </Box>

              <Box sx={{ mt: 2 }}>
                <EmployeeChart data={filteredData} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </main>
    </div>
  );
}
