import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const loggedUser = useSelector((store) => store.user.user);

    return (
        loggedUser ? <Outlet /> : <Navigate to="/login" />
    );
}