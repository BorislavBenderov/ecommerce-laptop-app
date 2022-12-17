import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedAdminRoutes = () => {
    const loggedUser = useSelector((store) => store.user.user);

    return (
        loggedUser?.uid === 'tDBOgC5e3VUMwYQJEyECdljlKhV2'
            ? <Outlet />
            : <Navigate to="/login" />
    );
}