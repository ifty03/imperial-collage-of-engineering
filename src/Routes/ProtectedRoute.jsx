import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function ProtectedRoute({ role }) {
    const { isLoaded, user } = useUser();

    if (!isLoaded) return <p>Loading...</p>;
    if (!user) return <Navigate to="/sign-in" />;

    const userRole = user.publicMetadata.role;

    if (userRole !== role) return <Navigate to="/unauthorized" />;

    // Render nested routes
    return <Outlet />;
}