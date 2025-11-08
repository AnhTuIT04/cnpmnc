import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { Box, CircularProgress } from '@mui/material';

export const GuestLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isAuthenticated) {
        // Redirect based on role
        const storedUser = localStorage.getItem('user_data');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                if (userData.role === 'SUPERVISOR') {
                    return <Navigate to="/employee" replace />;
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};