import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

export const ProtectedAdminRoutes = () => {
    const { loggedUser } = useContext(AuthContext);

    return (
        loggedUser?.uid === 'tDBOgC5e3VUMwYQJEyECdljlKhV2'
            ? <Outlet />
            : <Navigate to="/login" />
    );
}