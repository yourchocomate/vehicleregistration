import { useApp } from "@/hooks";
import NotFound from "@/pages/NotFound";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }: { roles: string[]  }) => {
    const { role: user } = useApp();
    return roles.includes(user || "") ? <Outlet /> : <NotFound />
}

export default ProtectedRoute;